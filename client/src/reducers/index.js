import {combineReducers} from "redux";
import authReducer from "./authReducer";
import surveysReducer from "./surveysReducer";
import {reducer as formReducer} from "redux-form";

//combineReducers define what is inside  the state of our app
//all of this are inside the state of our redux store
export default combineReducers({
            //all reducers here
        auth:authReducer,
        form:formReducer,  // don't change the key "form" **obliged**
        surveys:surveysReducer
})