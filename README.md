# SFCC-ReCAPTCHA

## Document Explaining All Changes in PR #1 for SFCC-ReCAPTCHA

### Pull Request Title: recaptcha changes for sfcc

**Pull Request URL**: PR #1

### Summary:
This pull request integrates Google reCAPTCHA into the Salesforce Commerce Cloud (SFCC) project. The changes include the addition of service configurations, custom attributes, controllers, helpers, services, JavaScript for frontend validation, and ISML templates for reCAPTCHA integration.

### Changes Overview:

#### Service Configurations:
- **File**: `data/service.xml`
- **Details**:
  - Added a new service credential for `google.recaptcha.verify.credentials` with the URL `https://www.google.com/recaptcha/api/siteverify`.
  - Defined a service profile `google.recaptcha.verify.profile` with timeout and rate-limit configurations.
  - Created a service `google.recaptcha.verify` using the defined credential and profile.

#### Custom Attributes:
- **File**: `data/system-object.xml`
- **Details**:
  - Added custom attributes to the `SitePreferences` type:
    - `googleRecaptchaEnabled` (boolean) to enable/disable Google reCAPTCHA.
    - `googleRecaptchaSiteKey` (string) for the site key from the Google reCAPTCHA admin console.
    - `googleRecaptchaSecretKey` (string) for the secret key from the Google reCAPTCHA admin console.
  - Grouped these attributes under the Google ReCaptcha Settings.

#### Controllers:
- **File**: `int_google_recaptcha/cartridges/int_google_recaptcha/cartridge/controllers/ReCaptcha.js`
- **Details**:
  - Created a new controller to handle reCAPTCHA verification.
  - Defined a POST endpoint `Verify` to verify the reCAPTCHA token using the RecaptchaService.

#### Helpers:
- **File**: `int_google_recaptcha/cartridges/int_google_recaptcha/cartridge/scripts/helpers/recaptchaHelper.js`
- **Details**:
  - Added helper functions to get the site key and check if reCAPTCHA is enabled.

#### Services:
- **File**: `int_google_recaptcha/cartridges/int_google_recaptcha/cartridge/scripts/services/recaptchaService.js`
- **Details**:
  - Created a service to verify the reCAPTCHA token by sending a request to Google's reCAPTCHA API.

#### Frontend JavaScript:
- **File**: `int_google_recaptcha/cartridges/int_google_recaptcha/cartridge/static/default/js/recaptcha.js`
- **Details**:
  - Added JavaScript to handle reCAPTCHA verification and error handling on the frontend.

#### ISML Templates:
- **Files**:
  - `account/login.isml`
  - `account/components/loginForm.isml`
  - `recaptcha/recaptchaScript.isml`
  - `recaptcha/recaptchaWidget.isml`
- **Details**:
  - Updated the login page to include the reCAPTCHA widget.
  - Included scripts and styles for reCAPTCHA.
  - Added conditional rendering for reCAPTCHA based on the enabled status.

---

This document provides a comprehensive overview of all changes made in the pull request to integrate Google reCAPTCHA into the SFCC project.
