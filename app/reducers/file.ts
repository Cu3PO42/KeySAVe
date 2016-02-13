import { OPEN_FILE, OPEN, OPENED, FAILURE } from "../actions/file";

interface FileData {
    name: string,
    status?: string,
    data?: any
}

export default function file(file = { name: "" }, action): FileData {
    switch (action.type) {
        case OPEN_FILE:
            switch(action.status) {
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
