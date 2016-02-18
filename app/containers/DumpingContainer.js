import * as React from 'react';
import { Component } from 'react';
import DumpingFileOpener from "../components/DumpingFileOpener";
import { openFile, openFileSuccess, openFileError, SAV, BV } from "../actions/file";
import { setFilterBv, setFilterSav } from "../actions/filter";
import PkmList from "../components/PkmList";
import { Dialog, FlatButton } from "material-ui";
import * as fse from "fs-extra";
import * as path from "path";
import IpcClient from "electron-ipc-tunnel/client";

export default class Home extends Component {
    static contextTypes = {
        store: React.PropTypes.object
    };

    ipcClient = new IpcClient();

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
    };

    componentWillMount() {
        this.unsubscribe = this.context.store.subscribe(() => this.updateState());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    updateState() {
        this.updateStateFile();
        this.updateStateFilter();
    }

    updateStateFile() {
        const { name, data } = this.context.store.getState().file;
        if (data === undefined) {
            this.setState({ file: "", pokemon: [], type: "", goodKey: false });
        }
        else {
            this.setState({ file: name, pokemon: data.pokemon, type: data.type, goodKey: data.goodKey });
        }
    }

    updateStateFilter() {
        const { filter, file } = this.context.store.getState();
        if (file.data !== undefined) {
            const { type } = file.data;
            const { lower, upper, isOpponent } = filter;
            this.setState({ lowerBox: lower, upperBox: upper, isOpponent });
            if (type === SAV) {
                this.setState({ boxFilter: function (pkm) {
                        return lower - 1 <= pkm.box && pkm.box < upper;
                    } });
            }
            else {
                this.setState({ boxFilter: function (pkm) {
                        return true;
                    } });
            }
        }
    }

    fileOpened = async (file) => {
        const { store } = this.context;
        store.dispatch(openFile(file));
        try {
            var { pokemon, goodKey, type } = await this.ipcClient.send("dump-save-or-bv", file);
            store.dispatch(openFileSuccess(type, pokemon, goodKey));
        } catch(e) {
            store.dispatch(openFileError());
            switch(e.name) {
                case "NoKeyAvailableError":
                    console.log(e.keyType);
                    this.setState({ dialogOpen: true, dialogMessage: `You have to break for this ${e.keyType === "SAV" ? "save" : "battle video"} first!` });
                    break;
                case "NotASaveOrBattleVideoError":
                    this.setState({ dialogOpen: true, dialogMessage: `This file is neither a supported save nor a supported battle video.` });
                    break;
                default:
                    this.setState({dialogOpen: true, dialogMessage: `An unknown error occured: ${e.name}`});
            }
        }
    };

    backup = async (file) => {
        var dialogMessage;
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
    };

    updateSavFilter = (lower, upper) => {
        this.context.store.dispatch(setFilterSav(lower, upper));
    };

    updateBvFilter = isOpponent => {
        this.context.store.dispatch(setFilterBv(isOpponent));
    };

    render() {
        const closeDialog = () => this.setState({ dialogOpen: false });
        return (
            <div>
                <DumpingFileOpener file={this.state.file} fileOpened={this.fileOpened} backup={this.backup} type={this.state.type} goodKey={this.state.goodKey} lowerBox={this.state.lowerBox} upperBox={this.state.upperBox} isOpponent={this.state.isOpponent} bvFilterChanged={this.updateBvFilter} savFilterChanged={this.updateSavFilter}/>
                <PkmList pokemon={this.state.type === BV ?
                                 (this.state.isOpponent && this.state.goodKey ?
                                      this.state.pokemon[1] :
                                      this.state.pokemon[0]) :
                                  this.state.pokemon} filter={this.state.boxFilter}/>
                <Dialog modal={true} open={this.state.dialogOpen} actions={[<FlatButton label="Ok" primary={true} onTouchTap={closeDialog}/>]}>
                    {this.state.dialogMessage}
                </Dialog>
            </div>
        );
    }
}
