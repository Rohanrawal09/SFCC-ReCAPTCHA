'use strict';

const Site = require('dw/system/Site');

module.exports = {
    getSiteKey: function () {
        return Site.current.getCustomPreferenceValue('googleRecaptchaSiteKey');
    },

    isEnabled: function () {
        return Site.current.getCustomPreferenceValue('googleRecaptchaEnabled');
    }
};