describe("CommonBankAccountValidator", function() {

  var validBankAccountParams;

  beforeEach(function() { 
    validBankAccountParams = {
      bankNumber         : "033",
      agencyNumber       : "1584",
      agencyCheckNumber  : "",
      accountNumber      : "12345678",
      accountCheckNumber : "6",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });

  describe("validate agency", function(){

    it("accepts a valid agency number", function() {
      validBankAccountParams.agencyNumber = "0170";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept agency with letters", function() {
      validBankAccountParams.agencyNumber = "AAAA";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency equal zero", function() {
      validBankAccountParams.agencyNumber = "0000";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency less than four numbers", function() {
      validBankAccountParams.agencyNumber = "170";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept agency greater than four numbers", function() {
      validBankAccountParams.agencyNumber = "11708";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate agency check number", function(){

    it("accepts a valid agency check number", function() {
      expect(Moip.CommonBankAccountValidator.agencyCheckNumberIsValid("9")).toBeTruthy();
    });

    it("accepts a valid agency check with letters", function() {
      expect(Moip.CommonBankAccountValidator.agencyCheckNumberIsValid("A")).toBeTruthy();
    });

    it("accepts a valid agency check empty", function() {
      expect(Moip.CommonBankAccountValidator.agencyCheckNumberIsValid("")).toBeTruthy();
    });

    it("accepts a valid agency check equal zero", function() {
      expect(Moip.CommonBankAccountValidator.agencyCheckNumberIsValid("0")).toBeTruthy();
    });

    it("does NOT accept agency check greater than one digits", function() {
      expect(Moip.CommonBankAccountValidator.agencyCheckNumberIsValid("12")).toBeFalsy();
    });

  });

  describe("validate account", function(){

    it("accepts a valid account number", function() {
      validBankAccountParams.accountNumber = "12345678";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account with letters", function() {
      validBankAccountParams.accountNumber = "AAAAA";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account equal zero", function() {
      validBankAccountParams.accountNumber = "000000000000";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account less than five numbers", function() {
      validBankAccountParams.accountNumber = "1234567890123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than twelve numbers", function() {
      validBankAccountParams.accountNumber = "1234567890123";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = { errors: [{ description: 'A conta corrente deve conter 8 números. Complete com zeros a esquerda se necessário.', code: 'INVALID_ACCOUNT_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate account check number", function(){

    it("accepts a valid account check number", function() {
      validBankAccountParams.accountCheckNumber = "9";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check with letters", function() {
      validBankAccountParams.accountCheckNumber = "A";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("accepts a valid account check equal zero", function() {
      validBankAccountParams.accountCheckNumber = "0";
      Moip.BankAccount.validate(validBankAccountParams);
      expect(validBankAccountParams.valid).toHaveBeenCalled();
    });

    it("does NOT accept account check empty", function() {
      validBankAccountParams.accountCheckNumber = "";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'INVALID_ACCOUNT_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account check greater than one digits", function() {
      validBankAccountParams.accountCheckNumber = "12";
      Moip.BankAccount.validate(validBankAccountParams);
      var expectedParams = {errors: [{ description: 'Dígito da conta corrente inválido', code: 'INVALID_ACCOUNT_CHECK_NUMBER' }] };
      expect(validBankAccountParams.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });
});