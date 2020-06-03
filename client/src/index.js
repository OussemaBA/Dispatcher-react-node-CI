import React from "react";
import ReactDom from "react-dom";
import App from "./components/App.js";
import {Provider} from "react-redux";
import {applyMiddleware, createStore} from "redux";
import reducers from "./reducers/index";
import "materialize-css/dist/css/materialize.min.css";
import reduxThunk from "redux-thunk";




//redux store -> combineReducers->{all reducers}
const store = createStore(reducers, [], applyMiddleware(reduxThunk));
// provide all reducers exits in the App to createStore()

/** Provider  is a react component that is capable of detecting
 changes inside our store and notify all the child
 components  of the new state and then update
 Provider(Store) -> (App)
 -a Provider  **provided by React-Redux** is a component that makes store accessible for
 * every components inside the App Componenent
 */

ReactDom.render(
    <div>

        <Provider store={store}><App/> </Provider>

    </div>
    , document.querySelector('#root'));


/*
npm install react-dom react-reducer

 */

/**
 * 1) React Components Calls a (action creator
 * -> returns an (Action
 * -> sent To (reducers
 * -> update the state in (store
 * -> back to (component
 * ))))
 *
 *
 */
