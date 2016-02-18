import { createAction } from "redux-actions";

export const FORMAT_LANGUAGE_CHANGED = "FORMAT_LANGUAGE_CHANGED";

export const changeFormatLanguage = createAction(FORMAT_LANGUAGE_CHANGED, language => ({ language }));