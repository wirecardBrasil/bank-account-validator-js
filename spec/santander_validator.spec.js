describe("SantanderValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "033",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "01789012",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });

  describe("validate agency check number", function(){

    it("does NOT accept agency check number", function() {
      validBankAccountParams.agencyCheckNumber = "1";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'O dígito da agência deve ser vazio', 
        code: 'INVALID_AGENCY_CHECK_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate account number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than twelve digits", function() {
      validBankAccountParams.accountNumber = "5678901";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than twelve digits", function() {
      validBankAccountParams.accountNumber = "067890123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});