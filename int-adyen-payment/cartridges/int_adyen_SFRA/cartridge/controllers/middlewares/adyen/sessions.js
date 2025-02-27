"use strict";

var Logger = require('dw/system/Logger');

var BasketMgr = require('dw/order/BasketMgr');

var Locale = require('dw/util/Locale');

var PaymentMgr = require('dw/order/PaymentMgr');

var _require = require('*/cartridge/scripts/adyenSessions'),
    createSession = _require.createSession;

var AdyenHelper = require('*/cartridge/scripts/util/adyenHelper');

var adyenTerminalApi = require('*/cartridge/scripts/adyenTerminalApi');

var constants = require('*/cartridge/adyenConstants/constants');

var paymentMethodDescriptions = require('*/cartridge/adyenConstants/paymentMethodDescriptions');

function getCountryCode(currentBasket, locale) {
  var _currentBasket$getShi;

  var countryCode = Locale.getLocale(locale.id).country;
  var firstItem = currentBasket === null || currentBasket === void 0 ? void 0 : (_currentBasket$getShi = currentBasket.getShipments()) === null || _currentBasket$getShi === void 0 ? void 0 : _currentBasket$getShi[0];

  if (firstItem !== null && firstItem !== void 0 && firstItem.shippingAddress) {
    return firstItem.shippingAddress.getCountryCode().value;
  }

  return countryCode;
}

function getConnectedTerminals() {
  if (PaymentMgr.getPaymentMethod(constants.METHOD_ADYEN_POS) && PaymentMgr.getPaymentMethod(constants.METHOD_ADYEN_POS).isActive()) {
    return adyenTerminalApi.getTerminals().response;
  }

  return '{}';
}
/**
 * Make a request to Adyen to create a new session
 */


function callCreateSession(req, res, next) {
  try {
    var currentBasket = BasketMgr.getCurrentBasket();
    var countryCode = getCountryCode(currentBasket, req.locale);
    var response = createSession(currentBasket, AdyenHelper.getCustomer(req.currentCustomer), countryCode);
    var adyenURL = "".concat(AdyenHelper.getLoadingContext(), "images/logos/medium/");
    var connectedTerminals = getConnectedTerminals();
    res.json({
      id: response.id,
      sessionData: response.sessionData,
      imagePath: adyenURL,
      adyenDescriptions: paymentMethodDescriptions,
      adyenConnectedTerminals: JSON.parse(connectedTerminals)
    });
    return next();
  } catch (error) {
    Logger.getLogger('Adyen').error('Failed to create Adyen Checkout Session');
    Logger.getLogger('Adyen').error(error);
    return next();
  }
}

module.exports = callCreateSession;