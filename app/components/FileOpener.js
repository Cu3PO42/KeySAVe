import * as React from 'react';
import { Component, PropTypes } from 'react';
import { Paper, FlatButton, TextField } from "material-ui";
import IpcClient from "electron-ipc-tunnel/client";
const styles = require("./FileOpener.module.scss");

const options = {};

const inputStyle = {
    color: "black"
};

export default class FileOpener extends Component {
    static propTypes = {
        file: PropTypes.string.isRequired,
        fileOpened: PropTypes.func.isRequired
    };

    ipcClient = new IpcClient();

    handleClick = () => {
        setTimeout(async () => {
            try {
                let reply = await this.ipcClient.send("file-dialog-open", { options });
                if (reply !== undefined && reply[0] !== undefined) {
                    this.props.fileOpened(reply[0]);
                }
            } catch (e) {}
        }, 500);
    };

    render() {
        return (
            <div className={styles.flexHorizontal}>
                <div className={styles.padRight}>
                    <FlatButton label="Open File" onClick={this.handleClick} className={styles.button}/>
                </div>
                <TextField floatingLabelText="File" value={this.props.file} disabled={true} inputStyle={inputStyle} fullWidth={true} />
            </div>
        );
    }
}
