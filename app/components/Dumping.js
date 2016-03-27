import React from 'react';
import DumpingFileOpener from '../components/DumpingFileOpener';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';
import PkmListLegacy from './formatters/legacy/PkmListLegacy';
import styles from './Dumping.module.scss';

const Dumping = ({ name, openFile, backup, type, goodKey, filter, setFilterBv, setFilterSav, pokemon, error, format, closeDialog }) => (
  <div>
    <DumpingFileOpener
      file={name}
      fileOpened={openFile}
      backup={backup}
      type={type}
      goodKey={goodKey}
      lowerBox={filter.lower}
      upperBox={filter.upper}
      isOpponent={filter.isOpponent}
      bvFilterChanged={setFilterBv}
      savFilterChanged={setFilterSav}
    />
    <div className={styles.pkmContainer}>
      {/* <format.current.plugin.FormatPlugin
        language={format.language}
        format={format.current.format}
        pokemon={pokemon}
      />*/}
      <PkmListLegacy
        language={format.language}
        format={format.current.format}
        pokemon={pokemon}
      />
    </div>
    <Dialog
      modal
      open={error !== undefined}
      actions={[<FlatButton label="Ok" primary onTouchTap={closeDialog}/>]}
    >
      {((e) => {
        switch (e.name) {
          case 'NoKeyAvailableError':
            return `You have to break for this ${e.keyType === 'SAV' ? 'save' : 'battle video'} first!`;
          case 'NotASaveOrBattleVideoError':
            return `This file is neither a supported save nor a supported battle video.`;
          default:
            return `An unknown error occured: ${e}`;
        }
      })(error || {})}
    </Dialog>
  </div>
);

export default Dumping;
