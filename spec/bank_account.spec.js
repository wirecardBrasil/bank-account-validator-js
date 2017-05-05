describe("BankAccount", function() {

  var validBankAccountParams;
  var invalidBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "001",
      agencyNumber       : "1584",
      agencyCheckNumber  : "9",
      accountNumber      : "00210169",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };

    invalidBankAccountParams = {
      bankNumber         : "001",
      agencyNumber       : "1",
      agencyCheckNumber  : "",
      accountNumber      : "000",
      accountCheckNumber : "",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy(),
    };
  });

  describe(".validate", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
      expect(validBankAccountParams.invalid).not.toHaveBeenCalled();
    });

    it("does NOT accept a invalid bank account", function() {
      Moip.BankAccount.validate(invalidBankAccountParams);
      expect(invalidBankAccountParams.invalid).toHaveBeenCalled();
      expect(invalidBankAccountParams.valid).not.toHaveBeenCalled();
    });

    it("accepts a valid bank number", function() {
      validBankAccountParams.bankNumber = "999";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
      expect(validBankAccountParams.invalid).not.toHaveBeenCalled();
    });

    it("does NOT accept a invalid bank number", function() {
      validBankAccountParams.bankNumber = "1";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Banco inválido', code: 'INVALID_BANK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
      expect(validBankAccountParams.valid).not.toHaveBeenCalled();
    });
  });

});