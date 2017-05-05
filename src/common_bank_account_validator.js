(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function CommonBankAccountValidator() {
    if ( !( this instanceof CommonBankAccountValidator ) ) {
      return new CommonBankAccountValidator();
    }
  }

  CommonBankAccountValidator.prototype = {

    agencyNumberIsValid: function(agencyNumber) {
      return /^(?!0000)([0-9]{4})$/.test(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return /^[a-zA-Z0-9]{0,1}$/.test(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return /^[0-9]{1,12}$/.test(accountNumber) && parseInt(accountNumber) > 0;
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return /^[a-zA-Z0-9]{1}$/.test(accountCheckNumber);
    },

    agencyNumberMsgError: function(length) {
      if (length === undefined) {
        length = this.agencyNumberLength();
      }
      return "A agência deve conter " + length + " números. Complete com zeros a esquerda se necessário.";
    },

    agencyCheckNumberMsgError: function(length) {
      if (length === undefined || length === 0) {
        return "O dígito da agência deve ser vazio";
      } else if (length === 1) {
        return "O dígito da agência deve conter 1 dígito";
      } else {
        return "O dígito da agência deve conter " + length + " números. Complete com zeros a esquerda se necessário.";  
      }
    },

    accountNumberMsgError: function(length) {
      return "A conta corrente deve conter " + length + " números. Complete com zeros a esquerda se necessário.";
    },

    agencyNumberLength: function() { return 4; }

  };

  Moip.CommonBankAccountValidator = CommonBankAccountValidator();

})(window);