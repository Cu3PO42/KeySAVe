import React from 'react';
import RadioButtonGroup from 'material-ui/RadioButton/RadioButtonGroup';
import RadioButton from 'material-ui/RadioButton';

const FormattingOptionsPretty = ({ format: { ghosts }, updateCurrentFormat, isDefault }) => (
  <div>
    <h4>Ghost data</h4>
    <RadioButtonGroup
      name="Ghosts"
      valueSelected={ghosts}
      onChange={(e, v) => updateCurrentFormat({ ghosts: v })}
      disabled={isDefault}
    >
      <RadioButton value="show" label="Show" />
      <RadioButton value="mark" label="Mark (recommended)" />
      <RadioButton value="hide" label="Hide" />
    </RadioButtonGroup>
  </div>
);

export default FormattingOptionsPretty;
