// SurveyForm shows multiple input to show to the user
import React, {Component} from "react";
import _ from "lodash";
import {Field, reduxForm} from "redux-form";
import SurveyField from "./SurveyField";
import {Link} from "react-router-dom";
import validateEmails from "../../utils/validateEmails";
import formFields from "./formFields";
//global variable --accessible to the whole file


class SurveyNew extends Component {


    renderFields() {


        return (
            _.map(formFields, field => {
                return (

                    <Field type="text" name={field.name} component={SurveyField} label={field.label}/>

                )
            })
        )
    }

    render() {

        return (
            <div>
                <form                   /**  without () so that the js compiler only trigger onSurveySubmit when submit is pressed **/
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to={"/survey"} className={"red btn-flat left white-text"}> Cancel</Link>
                    <button  className={"teal btn-flat right white-text"} type="submit">Next
                        <i className={"material-icons right"}> done</i>
                    </button>
                </form>
            </div>
        )

    }
}

// reduxForm works like connect method
// make redux store accessible to this components

/**
 *  1) add form to combineReducers
 *  2)  add default reduxForm()(MyComponene)
 */


// values: submited by the user taken from the redux store
//because we have a <Field/> named title and we hava errors.title
//redux can connect the dots and is able to console.log an error specific only for
//the named Field.. each field has a property called error so ::
// errors.title  goes to title error property

function validate(values)
{
    const errors ={}
      errors.recipients=validateEmails(values.recipients ||' ');
    //validate function works one time on reload so the emails are empty
    // || " " --> to fix it

     _.each(formFields,({name})=>{
         //referencing  a "formFields" name  in an js object

         if(!values[name]){
             errors[name]="Please provide a value"  ;  //--> errors.whatever_inside_name
         }

     })


    return errors;

}

export default reduxForm({
    validate, //validate: validate  --> reduxForm option that make validating form easily
    form: 'SurveyForm',
    destroyOnUnmount : false   // --> so that form values is not destroyed when reduxForm (SurveyForm)  is no longer visible
})(SurveyNew);