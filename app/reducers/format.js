import { handleAction } from "redux-actions";
import { FORMAT_LANGUAGE_CHANGED } from "../actions/format";

const defaultFormat = {
    language: "en"
};

export default function(formattingOptions = defaultFormat, action) {
    switch (action.type) {
        case FORMAT_LANGUAGE_CHANGED:
            return {
                ...formattingOptions,
                ...action.payload
            };
        default:
            return formattingOptions;
    }
};
