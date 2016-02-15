import * as React from 'react';
import { Component } from 'react';
import DumpingFileOpener from "../components/DumpingFileOpener";
import { Store } from "redux";
import { openFile, openFileSuccess, openFileError, SAV, BV } from "../actions/file";
import { setFilterBv, setFilterSav } from "../actions/filter";
import PkmList from "../components/PkmList";
import { Dialog, FlatButton } from "material-ui";
import * as fse from "fs-extra";
import * as path from "path";
import IpcClient from "electron-ipc-tunnel/client";
import Pkx from "keysavcore/pkx";

interface HomeState {
    pokemon?: Pkx[]|Pkx[][],
    file?: string,
    dialogOpen?: boolean;
    type?: string;
    dialogMessage?: string;
    goodKey?: boolean;
    boxFilter?: (pkm) => boolean;
    lowerBox?: number;
    upperBox?: number;
    isOpponent?: boolean;
}

export default class Home extends Component<{}, HomeState> {
    static contextTypes = {
        store: React.PropTypes.object
    }

    context: { store: Store };
    unsubscribe: Function;
    ipcClient = new IpcClient();

    componentWillMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.updateState());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    state = {
        file: "",
        pokemon: [],
        dialogOpen: false,
        type: "",
        dialogMessage: "",
        goodKey: false,
        boxFilter: () => true,
        lowerBox: 1,
        upperBox: 31,
        isOpponent: false
    }

    updateState() {
        this.updateStateFile();
        this.updateStateFilter();
    }

    updateStateFile() {
        const { name, data } = this.context.store.getState().file;
        if (data === undefined) {
            this.setState({file: "", pokemon: [], type: "", goodKey: false});
        } else {
            this.setState({file: name, pokemon: data.pokemon, type: data.type, goodKey: data.goodKey})
        }
    }

    updateStateFilter() {
        const { filter, file } = this.context.store.getState();
        if (file.data !== undefined) {
            const { type } = file.data;
            const { lower, upper, isOpponent } = filter;
            this.setState({lowerBox: lower, upperBox: upper, isOpponent});
            if (type === SAV) {
                this.setState({boxFilter: function(pkm) {
                    return lower-1 <= pkm.box && pkm.box < upper;
                }});
            } else {
                this.setState({boxFilter: function(pkm) {
                    return true;
                }});
            }
        }
    }

    fileOpened = async (file) => {
        const { store } = this.context;
        store.dispatch(openFile(file));
        try {
            let stats = await fse.statAsync(file);
            switch (stats.size) {
                case 0x100000:
                case 0x10009C:
                case 0x10019A:
                case 0x76000:
                case 0x65600:
                case 232*30*32:
                case 232*30*31:
                case 0x70000:
                case 0x80000:
                    let { pokemon, isNewKey } = await this.ipcClient.send("dump-save", file);
                    store.dispatch(openFileSuccess(SAV, pokemon, isNewKey));
                    break;
                case 28256:
                    let { enemyDumpable, myTeam, enemyTeam } = await this.ipcClient.send("dump-bv", file);
                    let pokemonBV = enemyDumpable ? [myTeam, enemyTeam] : [myTeam];
                    store.dispatch(openFileSuccess(BV, pokemonBV, enemyDumpable));
                    break;
                default:
                    this.setState({dialogOpen: true, dialogMessage: "Sorry, but this is neither a valid save nor a valid battle video."});
            }
        } catch(e) {
            store.dispatch(openFileError());
            this.setState({dialogOpen: true, dialogMessage: "Couldn't open this file."});
        }
    }

    backup = async (file: string) => {
        var dialogMessage: string;
        try {
            let name = this.state.type === "SAV" ? "Save" : "Battle Video";
            var dest = await this.ipcClient.send("file-dialog-save",
                { options: { filters: [{ name,
                                        extensions: [path.extname(file).slice(1)]}]}});
            await fse.copyAsync(file, dest);
            dialogMessage = `${name} backupped!`
        } catch (e) {
            dialogMessage = `Couldn't backup ${name}.`
        }
        this.setState({dialogOpen: true, dialogMessage});
    }

    updateSavFilter = (lower, upper) => {
        this.context.store.dispatch(setFilterSav(lower, upper));
    }

    updateBvFilter = isOpponent => {
        this.context.store.dispatch(setFilterBv(isOpponent));
    }

    render() {
        const closeDialog = () => this.setState({dialogOpen: false});
        return (
            <div>
                <DumpingFileOpener
                    file={this.state.file}
                    fileOpened={this.fileOpened}
                    backup={this.backup}
                    type={this.state.type}
                    goodKey={this.state.goodKey}
                    lowerBox={this.state.lowerBox}
                    upperBox={this.state.upperBox}
                    isOpponent={this.state.isOpponent}
                    bvFilterChanged={this.updateBvFilter}
                    savFilterChanged={this.updateSavFilter} />
                <PkmList
                    pokemon={this.state.type === BV ?
                             (this.state.isOpponent && this.state.goodKey ?
                                this.state.pokemon[1] :
                                this.state.pokemon[0]) :
                                this.state.pokemon}
                    filter={this.state.boxFilter} />
                <Dialog
                    modal={true}
                    open={this.state.dialogOpen}
                    actions={[<FlatButton label="Ok" primary={true} onTouchTap={closeDialog} />]}>
                    {this.state.dialogMessage}
                </Dialog>
            </div>
        );
    }
}
