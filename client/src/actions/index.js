import axios from "axios";
import {FETCH_SURVEYS, FETCH_USER} from "./types";

// action return a function will be dispatched only when axios promis is resolved
//Step 1 : Providing an action to functionDispatcher (**fetchUser here**)


export const fetchUser = () =>
    async dispatch => {
        const res = await axios.get("/api/current_user")

        dispatch({type: FETCH_USER, payload: res.data});
    }

export const handleToken = (token) =>
    async  dispatch =>{
            const res= await axios.post("/api/stripe",token)
        dispatch({type:FETCH_USER,payload:res.data});



}
/** wrap the colling component withRouter to enable history in the props **/

export const submitSurveyForm=(values,history)=>
    async  dispatch => {
        const res = await axios.post('/api/surveys', values)
        history.push('/survey'); // redirect the user to "main componant"
        dispatch({type: FETCH_USER, payload: res.data});
    }


// **REFACTOR TIP : function()  --> () =>{}
// async in front of the function that return the promise  **dispatch here**
// await infront of the result of that promise

export const fetchSurveys=()=>
    async  dispatch => {
        const res = await axios.get('/api/surveys');
        dispatch({type: FETCH_SURVEYS, payload: res.data});
    }



