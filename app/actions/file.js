export const OPEN_FILE = "OPEN_FILE";
export const OPEN = "OPEN";
export const OPENED = "OPENED";
export const FAILURE = "FAILURE";
export const SAV = "SAV";
export const BV = "BV";

export function openFile(file) {
    return {
        type: OPEN_FILE,
        status: OPEN,
        file
    };
}

export function openFileSuccess(type, pokemon, goodKey) {
    return {
        type: OPEN_FILE,
        status: OPENED,
        data: {
            type,
            pokemon,
            goodKey
        }
    };
}

export function openFileError() {
    return {
        type: OPEN_FILE,
        status: FAILURE
    };
}
