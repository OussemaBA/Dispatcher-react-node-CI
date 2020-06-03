//always define the initial state value
// we set null so that we know when action is not resolved yet..
import {FETCH_SURVEYS} from "../actions/types";

export default function (state = [], action) {
    switch (action.type) {
        case FETCH_SURVEYS:
            return action.payload
        default:
            return state;

    }
}