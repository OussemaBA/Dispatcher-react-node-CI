import React from "react";


const Card = ({survey}) =>
    <div className="cardContainer">
        <div className="card horizontal bbdefb blue lighten-4">
            <div className="card-stacked">

                <div className="card-content">
                    <p >Title   : {survey.title}</p>
                    <p>Body    :{survey.body}</p>
                    <p>subject : {survey.subject}</p>
                    <p>Sent On : {new Date (survey.dateSent).toLocaleDateString()}</p>

                </div>
                <div className="card-action">
                    <a>YES :{survey.yes}</a>
                    <a>NO :{survey.no}</a>
                </div>
            </div>
        </div>
    </div>


export default Card;