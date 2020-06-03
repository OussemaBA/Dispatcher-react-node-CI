import React from "react";
import {Link} from "react-router-dom";
import SurveysList from "../components/survey/SurveysList";

const Dashboard = () => {


    return (
        <div>

            Dashboard
            <SurveysList/>

            <div className={"fixed-action-btn"}>
                <   Link
                    className="btn-floating btn-large waves-effect waves-light red"
                    to="/survey/new"
                >
                    <i className="material-icons">add
                    </i>
                </Link>
            </div>
        </div>
    )

}

export default Dashboard;