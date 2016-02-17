export const FORMAT_LANGUAGE_CHANGED = "FORMAT_LANGUAGE_CHANGED";

export function changeFormatLanguage(language) {
    return {
        type: FORMAT_LANGUAGE_CHANGED,
        language
    }
}
