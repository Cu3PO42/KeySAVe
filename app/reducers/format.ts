import { FORMAT_LANGUAGE_CHANGED } from "../actions/format";

const defaultFormat = {
    language: "en"
};

export default function format(formattingOptions = defaultFormat, action) {
    switch (action.type) {
        case FORMAT_LANGUAGE_CHANGED:
            return Object.assign({}, formattingOptions, {
                language: action.language
            });
        default:
            return formattingOptions;
    }
}
