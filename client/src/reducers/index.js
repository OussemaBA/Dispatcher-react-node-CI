import {combineReducers} from "redux";
import authReducer from "./authReducer";

//combineReducers define what is inside  the state of our app
//all of this are inside the state of our redux store
export default combineReducers({
            //all reducers here
        auth:authReducer
})