const keys = require("../config/keys")
module.exports = (survey) => {
    return `
         <html>
         <body>
            <div style="text-align:center">
                    <h3>Please take a minuit  to respond to this feedback</h3>
                     <p> Please answer this following Question:</p>
                     <p>${survey.body}</p>
                     <div>
                     <a href="${keys.emailRedirectDomain}/api/surveys/${survey.id}/yes">YES</a>
                     </div>
                     <div>
                     <a href="${keys.emailRedirectDomain}/api/surveys/${survey.id}/no">NO</a>
                     </div>
            
            
</div>
         
</body>
         
</html>
   
   `;
}

