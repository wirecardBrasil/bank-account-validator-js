(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function HSBCValidator() {
    if ( !( this instanceof HSBCValidator ) ) {
      return new HSBCValidator();
    }
  }

  HSBCValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber === undefined || agencyCheckNumber === "";
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == this.accountNumberLength() &&
        Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return true;
    },

    agencyCheckNumberMatch: function(bankAccount) {
      return true;
    },

    accountCheckNumberMatch: function(bankAccount) {
      return true;
    },

    agencyNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyNumberMsgError();
    },

    agencyCheckNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyCheckNumberMsgError();
    },

    accountNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.accountNumberMsgError(this.accountNumberLength());
    },

    accountNumberLength: function() { return 6; }

  };

  Moip.HSBCValidator = HSBCValidator();

})(window);
