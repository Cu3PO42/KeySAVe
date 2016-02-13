import * as React from 'react';
import { Component } from 'react';
import FileOpener from "../components/FileOpener";
import { Paper, IconButton, Slider, RadioButton, RadioButtonGroup } from "material-ui";
import { FileCloudDownload } from "material-ui/lib/svg-icons";
import * as pureRender from "pure-render-decorator";
const styles = require("./DumpingFileOpener.module.scss");

interface DumpingFileOpenerProps {
    file: string;
    fileOpened: (file: string) => void;
    backup: (file: string) => any;
    type: string;
    goodKey: boolean;
    bvFilterChanged: (isOpponent: boolean) => any;
    savFilterChanged: (lower: number, upper: number) => any;
    lowerBox: number;
    upperBox: number;
    isOpponent: boolean;
}

interface DumpingFileOpenerState {
    lowerBox?: number;
    upperBox?: number;
    isOpponent?: boolean;
}

@pureRender
class DumpingFileOpener extends Component<DumpingFileOpenerProps, DumpingFileOpenerState> {
    static propTypes: React.ValidationMap<any> = {
        file: React.PropTypes.string,
        fileOpened: React.PropTypes.func,
        backup: React.PropTypes.func,
        type: React.PropTypes.string,
        opponentDumpable: React.PropTypes.bool,
        bvFilterChanged: React.PropTypes.func,
        savFilterChanged: React.PropTypes.func,
        lowerBox: React.PropTypes.number,
        upperBox: React.PropTypes.number,
        isOpponent: React.PropTypes.bool
    }

    lowerBoxChanged = (e, value) => {
        this.updateSav(value, this.props.upperBox);
    }

    upperBoxChanged = (e, value) => {
        this.updateSav(this.props.lowerBox, value);
    }

    radioChanged = (e, value) => {
        this.props.bvFilterChanged(value === "opponentTeam");
    }

    updateSav(lowerBox, upperBox) {
        let [lower, upper] = [lowerBox, upperBox].sort((a, b) => a-b);
        this.props.savFilterChanged(lower, upper);
    }

    render() {
        return (
            <Paper className={styles.paper}>
                <FileOpener fileOpened={this.props.fileOpened} file={this.props.file} />
                <div className={styles.flexFromRight}>
                    <IconButton onClick={e => this.props.backup(this.props.file)} disabled={this.props.file === ""}>
                        <FileCloudDownload />
                    </IconButton>
                    {this.props.type === "SAV" ?
                        <div className={styles.sliderWrapper}>
                            <Slider min={1} max={31} step={1} value={this.props.lowerBox} onChange={this.lowerBoxChanged} name="firstBox" style={{width: "100px", marginRight: "10px"}} />
                            <Slider min={1} max={31} step={1} value={this.props.upperBox} onChange={this.upperBoxChanged} name="secondBox" style={{width: "100px"}} />
                        </div>
                     : this.props.type === "BV" ?
                        <div className={styles.radioButtonWrapper}>
                            <RadioButtonGroup name="bv" onChange={this.radioChanged} valueSelected={this.props.isOpponent ? "opponentTeam" : "myTeam"}>
                                <RadioButton value="myTeam" label="My Team" />
                                <RadioButton value="opponentTeam" label="Opponent Team" disabled={!this.props.goodKey} />
                            </RadioButtonGroup>
                        </div>
                     :
                     <div></div>
                    }
                </div>
                {this.props.goodKey === false && this.props.type === "SAV" ?
                    <div className={styles.keyWarning}>
                        OLD STYLE KEY: SAVING TWICE REQUIRED
                    </div> : undefined
                }
            </Paper>
        );
    }
}

export default DumpingFileOpener;
