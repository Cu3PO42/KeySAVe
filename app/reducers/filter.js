import { SET_FILTER_BV, SET_FILTER_SAV } from "../actions/filter";

const initialFilter = {
    isOpponent: false,
    lower: 1,
    upper: 31
};

export default function (state = initialFilter, action) {
    switch (action.type) {
        case SET_FILTER_BV:
            return {
                ...state,
                ...action.payload
            };
        case SET_FILTER_SAV:
            return {
                ...state,
                ...action.payload
            }
        default:
            return state;
    }
}
