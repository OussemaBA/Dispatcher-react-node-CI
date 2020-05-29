import React, {Component} from "react";
import StripeCheckout from "react-stripe-checkout";
import {connect} from "react-redux";
import * as actions from "../actions/index";
class Payment extends Component {

//amout={1000} : the money we gonna charge to the user
    render() {
        return (
            <StripeCheckout
                name={"DISPATCHER"}
                description={"GET 5 Email surveys only for 10$"}
                token={(token) => {
                        this.props.handleToken(token)
                }}
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
                amount={1000}  >
                <button className={"btn"}>ADD CREDITS</button>

            </StripeCheckout>
        )
    }
}

export default connect(null,actions)(Payment);