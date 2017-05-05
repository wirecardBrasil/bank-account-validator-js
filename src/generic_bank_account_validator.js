(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function GenericBankAccountValidator() {
    if ( !( this instanceof GenericBankAccountValidator ) ) {
      return new GenericBankAccountValidator();
    }
  }

  GenericBankAccountValidator.prototype = {
    bankNumberIsValid : function (bankNumber) {
      return /^([0-9A-Za-x]{3,5})$/.test(bankNumber);
    },

    agencyNumberIsValid: function(agencyNumber) {
      return /^[0-9]{1,5}$/.test(agencyNumber) && parseInt(agencyNumber) > 0;
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,2}$/.test(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return /^[a-zA-Z0-9]{0,2}$/.test(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      return true;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      return true;
    },

    agencyNumberMsgError: function(length) {
      return "Agência inválida";
    },

    agencyCheckNumberMsgError: function() {
      return "Dígito da agência inválido";
    },

    accountNumberMsgError: function(length) {
      return "Conta corrente inválida";
    }
  };

  Moip.GenericBankAccountValidator = GenericBankAccountValidator();

})(window);