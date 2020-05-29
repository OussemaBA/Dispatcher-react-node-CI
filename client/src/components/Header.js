import React, {Component} from "react";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Payment from "./Payment";
class Header extends Component {

    RenderContent() {
        switch (this.props.auth) {
            case null: // not knowing if the user is logged in or not
                return "still Deciding";
            case false:
                return (    // not logged in
                    <li><a href={"/auth/google"}>Log in with google </a></li>
                );
            // user is logged in
            default:
                return ([
                   <li key={1}> <Payment /></li>,
                    <li key={3} style={{margin:"0 10px"}}> Credits:{this.props.auth.credits} </li>,

                <li key={2}><a href={"/api/logout"}> log out </a></li>]);

        }
    }

    render() {
        return (
            <nav>
                <div className="nav-wrapper">
                    <Link
                        to={this.props.auth ? "/survey" : '/'}
                        className="left brand-logo"
                    >
                        Dispatcher
                    </Link>

                    <ul className={"right"}>

                        {this.RenderContent()}

                    </ul>
                </div>
            </nav>
        )
    }
}

//**Getting props from redux store**/
function mapStateToProps({auth}) {
    return {auth}
}

//**connection to redux store**/
//**after connection the infos we need are available in **this.props
export default connect(mapStateToProps)(Header);