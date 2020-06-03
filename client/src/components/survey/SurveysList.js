import React, {Component} from "react";
import {fetchSurveys} from "../../actions";
import {connect} from "react-redux";
import Card from "../Card";

class SurveysList extends Component {

    componentDidMount() {
        //calling an action creactor -> reach out to the redux store and return its content
        //mapStateToProps --> state preprocessing if it is so complexe and make redux state available  in props
        this.props.fetchSurveys();
    }
            //alwaus function make a return statement
    renderContent() {
      return   this.props.surveys.reverse().map(survey => (

                <Card survey={survey}/>
            )
        )
    }


    render() {
        return (<div>
            {this.renderContent()}

        </div>)

    }

}

function mapStateToProps({surveys}) {
    return {surveys}; // we have to return an object
    // {surveys:surveys}
}

export default connect(mapStateToProps, {fetchSurveys})(SurveysList)