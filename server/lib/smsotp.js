const axios = require('axios');

module.exports = class SMSOTPClient {
    constructor(tenant) {
        this.tenant = tenant;
        return this;
    }

    async enroll(token, phoneNumber) {

        let config = {
            method: 'post',
            url: this.tenant + '/v2.0/factors/smsotp',
            headers: { 'Authorization': 'Bearer ' + token },
            data: {
                "phoneNumber": phoneNumber,
                "enabled": true
            }
        };

        let result = {};
        try {

            let res = await axios(config);
            result.data = res.data;
        }
        catch (error) {
            console.error("[smsotp::enroll] " + error);
            result.error = {
                status: error.response.status,
                body: error.response.data
            }
        }

        return result;
    }

    async initiateAuth(token, factorId, correlation) {

        let config = {
            method: 'post',
            url: this.tenant + '/v2.0/factors/smsotp/' + factorId + '/verifications',
            headers: { 'Authorization': 'Bearer ' + token },
            data: {
                "correlation": correlation
            }
        };

        let result = {};
        try {

            let res = await axios(config);
            result.data = res.data;
        }
        catch (error) {
            console.error("[smsotp::enroll] " + error);
            result.error = {
                status: error.response.status,
                body: error.response.data
            }
        }

        return result;
    }

    async verify(token, factorId, trxId, otp) {

        let config = {
            method: 'post',
            url: this.tenant + '/v2.0/factors/smsotp/' + factorId + '/verifications/' + trxId,
            headers: { 'Authorization': 'Bearer ' + token },
            data: {
                "otp": otp
            }
        };

        let result = {};
        try {

            let res = await axios(config);
            result.data = res.data;
        }
        catch (error) {
            console.error("[smsotp::verify] " + error);
            result.error = {
                status: error.response.status,
                body: error.response.data
            }
        }

        return result;
    }

    async delete(token, factorId) {

        let config = {
            method: 'delete',
            url: this.tenant + '/v2.0/factors/smsotp/' + factorId,
            headers: { 'Authorization': 'Bearer ' + token }
        };

        let result = { success: true };
        try {

            let res = await axios(config);
        }
        catch (error) {
            console.error("[smsotp::enroll] " + error);
            result.success = false;
            result.error = {
                status: error.response.status,
                body: error.response.data
            }
        }

        return result;
    }
}