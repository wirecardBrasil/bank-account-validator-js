(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BradescoValidator() {
    if ( !( this instanceof BradescoValidator ) ) {
      return new BradescoValidator();
    }
  }

  BradescoValidator.prototype = {
    agencyNumberIsValid: function(agencyNumber) {
      return Moip.CommonBankAccountValidator.agencyNumberIsValid(agencyNumber);
    },

    agencyCheckNumberIsValid: function(agencyCheckNumber) {
      return agencyCheckNumber.length == this.agencyCheckNumberLength() && 
        Moip.CommonBankAccountValidator.agencyCheckNumberIsValid(agencyCheckNumber);
    },

    accountNumberIsValid: function(accountNumber) {
      return accountNumber.length == this.accountNumberLength() && 
        Moip.CommonBankAccountValidator.accountNumberIsValid(accountNumber);
    },

    accountCheckNumberIsValid: function(accountCheckNumber) {
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      var checkNumberInformed = bankAccount.agencyCheckNumber.toUpperCase();
      if (checkNumberInformed === "0") {
        return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
      }
      return checkNumberCalculated === checkNumberInformed;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      var checkNumberInformed = bankAccount.accountCheckNumber.toUpperCase();
      if (checkNumberInformed === "0") {
        return checkNumberCalculated === checkNumberInformed || checkNumberCalculated === "P";
      }
      return checkNumberCalculated === checkNumberInformed;
    },

    agencyNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyNumberMsgError();
    },

    agencyCheckNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.agencyCheckNumberMsgError(this.agencyCheckNumberLength());
    },

    accountNumberMsgError: function() {
      return Moip.CommonBankAccountValidator.accountNumberMsgError(this.accountNumberLength());
    },

    agencyCheckNumberLength: function() { return 1; },

    accountNumberLength: function() { return 7; }

  };

  Moip.BradescoValidator = BradescoValidator();

})(window);