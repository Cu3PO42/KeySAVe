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
                isOpponent: action.isOpponent
            };
        case SET_FILTER_SAV:
            return {
                ...state,
                lower: action.lower,
                upper: action.upper
            }
        default:
            return state;
    }
}
