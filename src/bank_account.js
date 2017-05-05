(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BankAccount() {
    if ( !( this instanceof BankAccount ) ) {
      return new BankAccount();
    }
  }

  BankAccount.prototype = {

    validator: function (bankNumber) {

      var validators = {
        "001": Moip.BancoDoBrasilValidator,
        "237": Moip.BradescoValidator,
        "341": Moip.ItauValidator,
        "033": Moip.SantanderValidator,
        "745": Moip.CitibankValidator,
        "399": Moip.HSBCValidator
      };

      if (validators[bankNumber]) {
        return validators[bankNumber];
      } else {
        return Moip.GenericBankAccountValidator;
      }
    },

    validate: function (params){

      var errors = [];
      var validator = this.validator(params.bankNumber);

      if(!Moip.GenericBankAccountValidator.bankNumberIsValid(params.bankNumber)){
        errors.push({ description: "Banco inválido", code: "INVALID_BANK_NUMBER" });
      }

      if(!validator.agencyNumberIsValid(params.agencyNumber)){
        errors.push({ description: validator.agencyNumberMsgError(), code: "INVALID_AGENCY_NUMBER" });
      }

      if(!validator.agencyCheckNumberIsValid(params.agencyCheckNumber)){
        errors.push({ description: validator.agencyCheckNumberMsgError(), code: "INVALID_AGENCY_CHECK_NUMBER" });
      }

      if(!validator.accountNumberIsValid(params.accountNumber)){
        errors.push({ description: validator.accountNumberMsgError(), code: "INVALID_ACCOUNT_NUMBER" });
      }

      if(!validator.accountCheckNumberIsValid(params.accountCheckNumber)){
        errors.push({ description: "Dígito da conta corrente inválido", code: "INVALID_ACCOUNT_CHECK_NUMBER" });
      }

      if(validator.agencyNumberIsValid(params.agencyNumber) && validator.agencyCheckNumberIsValid(params.agencyCheckNumber)){
        if(!validator.agencyCheckNumberMatch(params)) {
          errors.push({ description: "Dígito da agência não corresponde ao número da agência preenchido", code: "AGENCY_CHECK_NUMBER_DONT_MATCH" });
        }
      }

      if(validator.accountNumberIsValid(params.accountNumber) && validator.accountCheckNumberIsValid(params.accountCheckNumber)){
        if(!validator.accountCheckNumberMatch(params)) {
          errors.push({ description: "Dígito da conta não corresponde ao número da conta/agência preenchido", code: "ACCOUNT_CHECK_NUMBER_DONT_MATCH" });
        }
      }

      if(errors.length === 0) {
        params.valid();
      } else {
        params.invalid({ errors: errors });
      }
    }

  };

  Moip.BankAccount = BankAccount();

})(window);
