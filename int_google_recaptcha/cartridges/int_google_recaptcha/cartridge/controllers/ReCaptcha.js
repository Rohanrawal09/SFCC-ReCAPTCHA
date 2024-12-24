'use strict';

const server = require('server');
const RecaptchaService = require('*/cartridge/scripts/services/recaptchaService');
const Logger = require('dw/system/Logger').getLogger('google.recaptcha');

server.post('Verify', server.middleware.https, function (req, res, next) {
    const recaptchaResponse = req.form.recaptchaResponse;

    try {
        const verificationResult = RecaptchaService.verifyToken(recaptchaResponse);

        if (verificationResult.success) {
            res.json({
                success: true,
                score: verificationResult.score // Only available in v3
            });
        } else {
            Logger.warn('ReCaptcha verification failed: {0}', verificationResult.errorCodes);
            res.json({
                success: false,
                errors: verificationResult.errorCodes
            });
        }
    } catch (e) {
        Logger.error('ReCaptcha verification error: {0}', e.message);
        res.json({
            success: false,
            error: e.message
        });
    }

    next();
});

module.exports = server.exports();