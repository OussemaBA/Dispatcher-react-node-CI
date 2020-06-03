import React, {Component} from "react"
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "../actions/index";
/**Components**/
import Header from "./Header";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import SurveyNew from "./survey/SurveyNew";
/**END COMPONENTS**/

class App extends Component {

    componentDidMount() {
        /**-- step2 : connect the Component to the Store using "connect method" so that we can call an action creator
         // within **this.props.fetchUser**.
         this action when resolved goes straight to All Reducers
         --**/
        this.props.fetchUser();

    }

    render() {
        return (
            <div className={"container"}>
                <BrowserRouter>
                    <div>
                        <Header/>
                        <Route exact path="/survey" component={Dashboard}/>
                        <Route exact path="/" component={Landing}/>
                        <Route exact path="/survey/new" component={SurveyNew}/>
                    </div>
                </BrowserRouter>
            </div>
        )
    }
}

export default connect(null, actions)(App);  //component connected to the store
//null because we didn't define mStateToProps function
// all different actions we want to wire up
// whe choose all (*) because this this the main Component so all actions must be wired up
