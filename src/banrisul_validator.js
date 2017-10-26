(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BanrisulValidator() {
    if ( !( this instanceof BanrisulValidator ) ) {
      return new BanrisulValidator();
    }
  }

  BanrisulValidator.prototype = {
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
      return Moip.CommonBankAccountValidator.accountCheckNumberIsValid(accountCheckNumber);
    },

    agencyCheckNumberMatch: function(bankAccount) {
      return true;
    },
    
    accountCheckNumberMatch: function(bankAccount) {
      var checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculate(bankAccount.accountNumber);
      return checkNumberCalculated === bankAccount.accountCheckNumber;
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

    accountNumberLength: function() { return 9; }
    
  };

  Moip.BanrisulValidator = BanrisulValidator();

})(window);