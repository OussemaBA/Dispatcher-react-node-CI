
// make the front end connect with the backend
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth/google',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: false,  //**true means that  :3000  will  change to 5000 when returned the response
        })
    );
    app.use(
        '/api/*',
        createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: false,
        })
    );

};