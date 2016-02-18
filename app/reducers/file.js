import { OPEN_FILE, OPEN, OPENED, FAILURE } from "../actions/file";

export default function file(file = { name: "" }, action) {
    switch (action.type) {
        case OPEN_FILE:
            switch (action.status) {
                case OPEN:
                    return {
                        name: action.file,
                        status: "OPENING"
                    };
                case OPENED:
                    return {
                        name: file.name,
                        status: "OPENED",
                        data: action.data
                    };
                case FAILURE:
                    return {
                        name: ""
                    };
            }
        default:
            return file;
    }
}
