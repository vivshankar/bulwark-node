const axios = require('axios');

module.exports = class FactorsClient {
    constructor(tenant) {
        this.tenant = tenant;
        console.log("[Constructor] Tenant = " + this.tenant);
        return this;
    }

    async getFactors(token) {

        let config = {
            method: 'get',
            url: this.tenant + '/v2.0/factors',
            headers: { 
                'Authorization': 'Bearer ' + token,
                'Accept': 'application/json'
            }
        };

        let factors = {
            smsotp: [],
            emailotp: [],
            totp: [],
            verify: [],
            fido2: []
        };

        try {

            let res = await axios(config);
            console.log("[getFactors] Response " + JSON.stringify(res.data));

            if (res.total == 0) {
                return factors;
            }

            // Classify by type
            res.data.factors.forEach(function (factor) {
                switch (factor.type) {
                    case 'emailotp':
                        factors.emailotp.push(factor);
                        break;
                    case 'smsotp':
                        factors.smsotp.push(factor);
                        break;
                    case 'totp':
                        factors.totp.push(factor);
                        break;
                    case 'fido2':
                        factors.fido2.push(factor);
                        break;
                }
            });

            // Get the signature authenticators
            factors.verify = await this.getSignatures(token);

        }
        catch (error) {
            if (error.response) {
                /*
                 * The request was made and the server responded with a
                 * status code that falls out of the range of 2xx
                 */
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            } else if (error.request) {
                /*
                 * The request was made but no response was received, `error.request`
                 * is an instance of XMLHttpRequest in the browser and an instance
                 * of http.ClientRequest in Node.js
                 */
                console.log(error.request);
            } else {
                // Something happened in setting up the request and triggered an Error
                console.log('Error', error.message);
            }
            console.log(error);
            console.error("[getFactors][Catch block] " + error);
            return null;
        }

        return factors;
    }
    
    async getSignatures(token) {

        let config = {
            method: 'get',
            url: this.tenant + '/v1.0/authnmethods/signatures?_embedded=true',
            headers: { 'Authorization': 'Bearer ' + token }
        };

        let factors = [];

        try {

            let res = await axios(config);
            console.log("[getSignatures] Response " + JSON.stringify(res.data));

            factors = res.data.signatures;
        }
        catch (err) {
            console.error("[getSignatures] " + err);
            return null;
        }

        return factors;
    }
    
    async discoverAvailableFactorTypes(token) {

        const config = {
            method: 'get',
            url: this.tenant + '/v2.0/factors/discover',
            headers: { 'Authorization': 'Bearer ' + token }
        };

        try {
            let res = await axios(config);
            console.log("[discoverAvailableFactorTypes] Response " + JSON.stringify(res.data));
            return res.data;
        }
        catch (err) {
            console.error("[discoverAvailableFactorTypes] " + err);
            return null;
        }

        return null;
    }
}
