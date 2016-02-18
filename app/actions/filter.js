import { createAction } from "redux-actions";

export const SET_FILTER_BV = "SET_FILTER_BV";
export const SET_FILTER_SAV = "SET_FILTER_SAV";

export const setFilterBv = createAction(SET_FILTER_BV, isOpponent => ({ isOppoennt }));
export const setFilterSav = createAction(SET_FILTER_SAV, (lower, upper) => ({ lower, upper }));