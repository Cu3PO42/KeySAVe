export { default as PkmList } from './PkmListHandlebars';
export { default as FormattingOptions } from './FormattingOptionsHandlebars';

export const name = 'Handlebars';
export const multipleInstances = true;

const defaultOption = {
  header: '',
  boxHeader: '',
  format: '',
  splitBoxes: false
};

export function fixFormattingOption(option) {
  const res = {};
  for (const key in defaultOption) {
    if (!defaultOption.hasOwnProperty(key)) continue;
    if (option[key] !== undefined) res[key] = option[key];
    else res[key] = defaultOption[key];
  }
  return res;
}

export const defaultOptions = [{
  name: 'Default',
  format: {
    header: 'Box - Slot - Species (Gender) - Nature - Ability - HP.ATK.DEF.SPATK.SPDEF.SPE - HP [ESV]',
    format: '{{#if isGhost}}~{{/if}}B{{box}} - {{row}},{{column}} - {{speciesName}} ({{genderString gender}}) - {{natureName}} - {{abilityName}} - {{ivHp}}.{{ivAtk}}.{{ivDef}}.{{ivSpAtk}}.{{ivSpDef}}.{{ivSpe}} - {{typeName hpType}} [{{esv}}]',
    boxHeader: '<h3 style="margin-bottom: 0; font-family: Roboto, sans-serif; color: #999">Box {{box}}</h3>',
    splitBoxes: false
  }
}, {
  name: 'TSV (Legacy)',
  format: {
    header: '| Box | Slot | OT | TID | SID | TSV |<br />|:---:|:---:|:---:|:---:|:---:|:---:|',
    format: '| {{#if isGhost}}~{{/if}}B{{box}} | {{row}},{{column}} | {{ot}} | {{tid6}} | {{sid}} | {{tsv}} |',
    boxHeader: '<h3 style="margin-bottom: 0; font-family: Roboto, sans-serif; color: #999">Box {{box}}</h3>',
    splitBoxes: false
  }
}, {
  name: 'TSV',
  format: {
    header: '| Box | Slot | OT | TID | TSV |<br />|:---:|:---:|:---:|:---:|:---:|:---:|',
    format: '| {{#if isGhost}}~{{/if}}B{{box}} | {{row}},{{column}} | {{ot}} | {{tid}} | {{tsv}} |',
    boxHeader: '<h3 style="margin-bottom: 0; font-family: Roboto, sans-serif; color: #999">Box {{box}}</h3>',
    splitBoxes: false
  }
}, {
  name: 'CSV',
  format: {
    header: 'Box,Row,Column,Species,Gender,Nature,Ability,HP IV,ATK IV,DEF IV,SPA IV,SPD IV,SPE IV,HP Type,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg',
    format: '{{#if isGhost}}~{{/if}}{{box}},{{row}},{{column}},{{speciesName}},{{genderString gender}},{{natureName}},{{abilityName}},{{ivHp}},{{ivAtk}},{{ivDef}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{typeName hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ballName}},{{tid6}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{moveName move1}},{{moveName move2}},{{moveName move3}},{{moveName move4}},{{moveName eggMove1}},{{moveName eggMove2}},{{moveName eggMove3}},{{moveName eggMove4}},{{isShiny}},{{isEgg}}',
    boxHeader: '<div style="margin-bottom: 20px;"></div>',
    splitBoxes: false
  }
}, {
  name: 'CSV (Raw Data)',
  format: {
    header: 'Box,Row,Column,Species,Gender,Nature,Ability,HP IV,ATK IV,DEF IV,SPA IV,SPD IV,SPE IV,HP Type,ESV,TSV,Nickname,OT,Ball,TID,SID,HP EV,ATK EV,DEF EV,SPA EV,SPD EV,SPE EV,Move 1,Move 2,Move 3,Move 4,Relearn 1,Relearn 2,Relearn 3,Relearn 4,Shiny,Egg',
    format: '{{#if isGhost}}~{{/if}}{{box}},{{row}},{{column}},{{species}},{{gender}},{{nature}},{{ability}},{{ivHp}},{{ivAtk}},{{ivSpAtk}},{{ivSpDef}},{{ivSpe}},{{hpType}},{{esv}},{{tsv}},{{nickname}},{{ot}},{{ball}},{{tid6}},{{sid}},{{evHp}},{{evAtk}},{{evDef}},{{evSpAtk}},{{evSpDef}},{{evSpe}},{{move1}},{{move2}},{{move3}},{{move4}},{{eggMove1}},{{eggMove2}},{{eggMove3}},{{eggMove4}},{{isShiny}},{{isEgg}}',
    boxHeader: '<div style="margin-bottom: 20px;"></div>',
    splitBoxes: false
  }
}, {
  name: 'JSON',
  format: {
    header: '',
    format: '{{toJson this}}',
    boxHeader: '<div style="margin-bottom: 20px;"></div>',
    splitBoxes: false
  }
}];
