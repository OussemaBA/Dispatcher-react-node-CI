//always define the initial state value
// we set null so that we know when action is not resolved yet..
import {FETCH_USER} from "../actions/types";

export default function (state = null, action) {
    switch (action.type) {
        case FETCH_USER:
            return action.payload || false
        //we want to return false if
        // action.payload is empty string
        //" " || false => false
        default:
            return state;

    }
}