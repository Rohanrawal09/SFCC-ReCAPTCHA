(function () {
    'use strict';

    window.verifyRecaptchaCallback = function(response) {
        $.ajax({
            url: $('.g-recaptcha').data('verify-url'),
            type: 'POST',
            data: {
                recaptchaResponse: response
            },
            success: function(data) {
                if (data.success) {
                    $('.recaptcha-error').hide();
                    // Trigger custom event for success
                    $(document).trigger('recaptcha:verified', [data]);
                } else {
                    $('.recaptcha-error').text(data.errors.join(', ')).show();
                    grecaptcha.reset();
                }
            },
            error: function() {
                $('.recaptcha-error').text('Verification failed. Please try again.').show();
                grecaptcha.reset();
            }
        });
    };

    window.expiredRecaptchaCallback = function() {
        $('.recaptcha-error').text('reCAPTCHA has expired. Please verify again.').show();
        grecaptcha.reset();
    };
})();