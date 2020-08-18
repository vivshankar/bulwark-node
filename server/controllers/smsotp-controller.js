const config = require('./config').Config;
const SMSClient = require('../lib/smsotp');
const oauthController = require('./oauth-controller');

exports.enroll = (req, res) => {
    
    let client = new SMSClient(config.tenantUrl);

    let token = oauthController.getAuthToken(req, res);
    if (token == null) {
        res.status(401);
        return;
    }

    client.enroll(token, req.body.phoneNumber)
        .then((result) => {
            if (result.error != null) {
                res.status(result.error.status);
                if (result.error.body != null) {
                    res.json(result.error.body);
                }

                return;
            }

            res.json(result.data);
        })
        .catch((error) => {
            console.error("[smsotp-controller::enroll] error = " + error);
            res.status(500);
        });
}

exports.initiateAuth = (req, res) => {
    
    let client = new SMSClient(config.tenantUrl);

    let token = oauthController.getAuthToken(req, res);
    if (token == null) {
        res.status(401);
        return;
    }

    client.initiateAuth(token, req.body.factorId, req.body.correlation)
        .then((result) => {
            if (result.error != null) {
                res.status(result.error.status);
                if (result.error.body != null) {
                    res.json(result.error.body);
                }

                return;
            }

            res.json(result.data);
        })
        .catch((error) => {
            console.error("[smsotp-controller::initiateAuth] error = " + error);
            res.status(500);
        });
}

exports.verify = (req, res) => {
    
    let client = new SMSClient(config.tenantUrl);

    let token = oauthController.getAuthToken(req, res);
    if (token == null) {
        res.status(401);
        return;
    }

    client.verify(token, req.body.factorId, req.body.trxId, req.body.otp)
        .then((result) => {
            if (result.error != null) {
                res.status(result.error.status);
                if (result.error.body != null) {
                    res.json(result.error.body);
                }

                return;
            }

            res.json(result.data);
        })
        .catch((error) => {
            console.error("[smsotp-controller::verify] error = " + error);
            res.status(500);
        });
}