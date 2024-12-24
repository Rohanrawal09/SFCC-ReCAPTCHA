'use strict';

const LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
const Site = require('dw/system/Site');
const Logger = require('dw/system/Logger').getLogger('google.recaptcha');

/**
 * Creates and returns the recaptcha verification service
 * @returns {dw.svc.Service} - The created service
 */
function getRecaptchaService() {
    return LocalServiceRegistry.createService('google.recaptcha.verify', {
        createRequest: function (svc, params) {
            svc.setRequestMethod('POST');
            svc.addHeader('Content-Type', 'application/x-www-form-urlencoded');

            const secretKey = Site.current.getCustomPreferenceValue('googleRecaptchaSecretKey');
            return 'secret=' + secretKey + '&response=' + params.token;
        },
        parseResponse: function (svc, response) {
            return JSON.parse(response.text);
        },
        filterLogMessage: function (msg) {
            return msg.replace(Site.current.getCustomPreferenceValue('googleRecaptchaSecretKey'), '***');
        }
    });
}

module.exports = {
    verifyToken: function (token) {
        const service = getRecaptchaService();
        const result = service.call({ token: token });

        if (result.status === 'OK') {
            return result.object;
        }

        throw new Error('Service call failed with status: ' + result.status);
    }
};
