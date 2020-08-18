const config = require('./config').Config;
const FactorsClient = require('../lib/factors');
const oauthController = require('./oauth-controller');

exports.getEnrollments = (req, res) => {
    
    console.log("[DEBUG] tenant = " + config.tenantUrl);
    let factorsClient = new FactorsClient(config.tenantUrl);

    let token = oauthController.getAuthToken(req, res);
    if (token == null) {
        res.status(403);
        res.json({
            code: "NO_TOKEN",
            description: "No authorization token available"
        });

        return;
    }

    factorsClient.getFactors(token)
        .then((enrollments) => {
            if (enrollments == null) {
                res.status(400);
                res.json({
                    code: "REQ_FAILED",
                    description: "Something failed"
                });
        
                return;
            }
        
            res.status(200);
            res.json(enrollments);
        })
        .catch((error) => {
            console.error("[getEnrollments] error = " + error);
            res.status(400);
            res.json({
                code: "REQ_FAILED",
                description: "Something failed"
            });
        });    
}

exports.getEnrollmentsView = (req, res) => {

    console.log("[DEBUG] tenant = " + config.tenantUrl);
    let factorsClient = new FactorsClient(config.tenantUrl);

    let token = oauthController.getAuthToken(req, res);
    if (token == null) {
        req.session.targetUrl = '/factors';
        res.redirect('/login');
        return;
    }

    let callbackUrl = req.query.callback;
    factorsClient.getFactors(token)
        .then((enrollments) => {
            if (enrollments == null) {
                res.status(400);
                res.json({
                    code: "REQ_FAILED",
                    description: "Something failed"
                });
        
                return;
            }
        
            res.status(200);
            res.render('factors', { enrollments: enrollments, title: 'My enrollments', isLoggedIn: true, callbackUrl: callbackUrl });
        })
        .catch((error) => {
            console.error("[getEnrollments] error = " + error);
            res.status(400);
            res.json({
                code: "REQ_FAILED",
                description: "Something failed"
            });
        });
}