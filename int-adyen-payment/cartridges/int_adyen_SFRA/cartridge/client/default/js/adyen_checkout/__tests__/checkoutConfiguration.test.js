"use strict";

var _require = require('../checkoutConfiguration'),
    getCardConfig = _require.getCardConfig,
    getPaypalConfig = _require.getPaypalConfig,
    getGooglePayConfig = _require.getGooglePayConfig,
    setCheckoutConfiguration = _require.setCheckoutConfiguration;

var store = require('../../../../../store');

var card;
var paypal;
var paywithgoogle;
beforeEach(function () {
  window.Configuration = {
    environment: 'TEST'
  };
  store.checkoutConfiguration = {};
  setCheckoutConfiguration();
  card = getCardConfig();
  paypal = getPaypalConfig();
  paywithgoogle = getGooglePayConfig();
});
describe('Checkout Configuration', function () {
  describe('Card', function () {
    it('handles onChange', function () {
      store.selectedMethod = 'scheme';
      store.componentsObj = {
        scheme: {}
      };
      var data = {
        paymentMethod: {
          type: 'scheme'
        }
      };
      card.onChange({
        isValid: true,
        data: data
      });
      expect(store.selectedPayment.isValid).toBeTruthy();
    });
    it('handles onFieldValid', function () {
      var mockedInput = "<input id='cardNumber' />";
      document.body.innerHTML = mockedInput;
      card.onFieldValid({
        endDigits: 4444
      });
      var cardNumber = document.querySelector('#cardNumber');
      expect(cardNumber.value).toEqual('************4444');
    });
    it('handles onBrand', function () {
      var mockedInput = "<input id='cardType' />";
      document.body.innerHTML = mockedInput;
      card.onBrand({
        brand: 'visa'
      });
      var cardType = document.querySelector('#cardType');
      expect(cardType.value).toEqual('visa');
    });
  });
  describe('PayPal', function () {
    it('handles onSubmit', function () {
      document.body.innerHTML = "\n        <div id=\"lb_paypal\">PayPal</div>\n        <div id=\"adyenPaymentMethodName\"></div>\n        <div id=\"adyenStateData\"></div>\n      ";
      store.selectedMethod = 'paypal';
      store.componentsObj = {
        paypal: {
          stateData: {
            foo: 'bar'
          }
        }
      };
      paypal.onSubmit({
        data: {}
      });
      expect(document.getElementById('adyenStateData').value).toBe(JSON.stringify(store.selectedPayment.stateData));
    });
  });
  describe('GooglePay', function () {
    it('handles onSubmit', function () {
      document.body.innerHTML = "\n        <div id=\"lb_paywithgoogle\">Google Pay</div>\n        <div id=\"adyenPaymentMethodName\"></div>\n        <button value=\"submit-payment\"></button>\n      ";
      var spy = jest.fn();
      var submitButton = document.querySelector('button[value="submit-payment"]');
      submitButton.addEventListener('click', function () {
        spy();
      });
      store.selectedMethod = 'paywithgoogle';
      paywithgoogle.onSubmit({
        data: {}
      });
      expect(spy).toBeCalledTimes(1);
      expect(submitButton.disabled).toBeFalsy();
    });
  });
});