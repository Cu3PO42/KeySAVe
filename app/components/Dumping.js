import React from 'react';
import DumpingFileOpener from '../components/DumpingFileOpener';
import PkmList from '../components/PkmList';
import Dialog from 'material-ui/lib/dialog';
import FlatButton from 'material-ui/lib/flat-button';

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
    <PkmList
      pokemon={pokemon}
      language={format.language}
      format={format.current.format}
      plugin={format.current.plugin}
    />
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
