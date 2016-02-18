export const SET_FILTER_BV = "SET_FILTER_BV";
export const SET_FILTER_SAV = "SET_FILTER_SAV";

export function setFilterBv(isOpponent) {
    return {
        type: SET_FILTER_BV,
        isOpponent
    };
}

export function setFilterSav(lower, upper) {
    return {
        type: SET_FILTER_SAV,
        lower,
        upper
    };
}
