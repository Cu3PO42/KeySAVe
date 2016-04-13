import React from 'react';
import RadioButtonGroup from 'material-ui/lib/radio-button-group';
import RadioButton from 'material-ui/lib/radio-button';
import CheckBox from 'material-ui/lib/checkbox';
import DropDownMenu from 'material-ui/lib/drop-down-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import styles from './FormattingOptionsReddit.module.scss';

const FormattingOptionReddit = ({
  format: {
    ghosts,
    splitBoxes,
    color,
    boldPerfectIVs
  },
  updateCurrentFormat,
  isDefault
}) => (
  <div className={styles.flexRow}>
    <div className={styles.column}>
      <h4>Ghost data</h4>
      <RadioButtonGroup
        name="Ghosts"
        valueSelected={ghosts}
        onChange={(e, v) => updateCurrentFormat({ ghosts: v })}
        disabled={isDefault}
      >
        <RadioButton value="show" label="Show" />
        <RadioButton value="mark" label="Mark with ~ (recommended)" />
        <RadioButton value="hide" label="Hide" />
      </RadioButtonGroup>
    </div>
    <div className={styles.column}>
      <h4>Miscellaneous</h4>
      <CheckBox
        label="Split boxes"
        checked={splitBoxes}
        onCheck={(e, v) => updateCurrentFormat({ splitBoxes: v })}
        disabled={isDefault}
      />
      <CheckBox
        label="Bold perfect IVs"
        checked={boldPerfectIVs}
        onCheck={(e, v) => updateCurrentFormat({ boldPerfectIVs: v })}
        disabled={isDefault}
      />
      <div className={styles.menuRow}>
        <span>Color boxes:</span>
        <DropDownMenu
          value={color}
          onChange={(e, v) => updateCurrentFormat({ color: v })}
          disabled={isDefault}
        >
          <MenuItem value={0} primaryText="None" />
          <MenuItem value={1} primaryText="Cycle" />
          <MenuItem value={2} primaryText="Blue" />
          <MenuItem value={3} primaryText="Green" />
          <MenuItem value={4} primaryText="Yellow" />
          <MenuItem value={5} primaryText="Red" />
        </DropDownMenu>
      </div>
    </div>
  </div>
);

export default FormattingOptionReddit;
