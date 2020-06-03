// SurveyNew shows a new SurveyForm to the user
import React, {Component} from "react";
import SurveyForm from "./SurveyForm";
import SurveyFormReview from "./SurveyFormReview";
import {reduxForm} from "redux-form";

class SurveyNew extends Component {

        state={showFormReview:false};

        renderContent(){
            if(this.state.showFormReview){
                return <SurveyFormReview onCancel={()=>
                    this.setState({showFormReview:false})}/>
            }
            return <SurveyForm onSurveySubmit={()=>{
                // this call back works when onSurveySumbit is triggred inside the child Component
                // if sumbit buttom inside SurveyForm is pressed then this callback is fired

               this.setState({showFormReview:true})}
            }/>
        }
    render() {
        return (
            <div>
                {this.renderContent()}
            </div>
        )

    }
}

// when user exit any form define inside any child of this component its values will be deleted
/**- SurveyForm form values   will be deleted -**/
export default reduxForm({
    form:'SurveyForm',
})(SurveyNew);
/**
 constructor(props){
    super(props)

    this.state={new: true }
}

 ----> eqv a
 state={new:true} // babel enable this
 **/
