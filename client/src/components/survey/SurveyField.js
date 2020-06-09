import React from 'react';

//inputs provided by ReduxForm
//meta:{error,touched} --> props.meta.error and touched
export default ({input, label, meta: {error, touched},styling}) => {

    return (
        <div className={styling}>
            <label   >{label}</label>
            <input {...input}  style={{"marginBottom":"20px"}}/>
            <div className={"red-text"} style={{"marginBottom":"20px"}}>
                {touched && error}
            </div>
        </div>
    )
}




