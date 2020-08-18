const config = require('./config').Config;

const oauthContext = require('ibm-verify-sdk').OAuthContext;
const authenticatorContext = require('ibm-verify-sdk').AuthenticatorContext;
let authClient = new oauthContext(config);
let authCtx = new authenticatorContext(authClient);

exports.authorize =  (req, res) => {
    authClient.authenticate().then(url => {
        res.redirect(url);
    }).catch(error => {
        res.send(error);
    })
}

exports.aznCallback = (req, res) => {
    authClient.getToken(req.url).then(token => {

        console.log("Got token - " + JSON.stringify(token));
        req.session.authToken = token;

        // Extract redirect URL from querystring
        let targetUrl = req.session.targetUrl;
        if (!targetUrl || targetUrl == "") {
            targetUrl = "/";
        }

        // redirect to authenticated page
        res.redirect(targetUrl);
    }).catch(error => {
        res.send("ERROR: " + error);
    });
}

exports.logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}

exports.isLoggedIn = (req) => {
    req.session.authToken != null && req.session.authToken != "";
}

exports.getAuthToken = (req, res) => {

    if (req.session.authToken != null && req.session.authToken != "") {
        return req.session.authToken.access_token;
    }

    return null;
}