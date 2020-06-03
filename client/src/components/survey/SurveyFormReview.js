//make the user review his email values before submitting
import React from 'react';
import {connect} from "react-redux";
import formFields from "./formFields";
import _ from 'lodash';
import * as actions from "../../actions/index";
import {withRouter} from "react-router-dom";


//submitSurveyForm action creator is passed as prop to this component
const SurveyFormReview = ({onCancel, reviewValues,submitSurveyForm,history}) => {

//reviewValues --> 'title':'internship'
    const reviewFields = _.map(formFields, ({label, name}) =>

        <div key={name}>
            <label>{label}</label>
            <div>
                {reviewValues[name]}
            </div>
        </div>
    )
    /**RETURN **/
    return (<div>

        <h5>Please review your entities</h5>
        {reviewFields}
        <button
            className="yellow darken-3 btn-flat left white-text"
            onClick={onCancel}
        > Back
        </button>
        <button
            className="green  btn-flat right white-text"
            onClick={()=>{
                submitSurveyForm(reviewValues, history);
            }}
        > Send
            <i className={"material-icons right"}> email</i>
        </button>
    </div>)
}

// mStateToProps extracts only what we need from our redux store it is so complex
/**  what ever object is return from mapStateToProps it will show up as a prop inside SurveyFormReview Component**/
function mapStateToProps(state) {

    return {reviewValues: state.form.SurveyForm.values};   // pulling  SurveyForm values from reduxForm  "stored also in redux store

}


/** withRouter to enable history in the props **/
export default connect(mapStateToProps,actions)(withRouter(SurveyFormReview));
//not action is needed so no variable actions provided
//submitSurveyForm action creator is passed as prop to this component when we passed "action" to connect function
