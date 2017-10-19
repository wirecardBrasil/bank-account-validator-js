describe("BanrisulValidator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      bankNumber         : "041",
      agencyNumber       : "1234",
      agencyCheckNumber  : "",
      accountNumber      : "358507671",
      accountCheckNumber : "8",
      valid: jasmine.createSpy(),
      invalid: jasmine.createSpy()
    };
  });


  describe("validate agency number", function(){

    it("does NOT accept invalid agency", function() {
      bankAccount.agencyNumber = "333123";
      bankAccount.accountCheckNumber = "1";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = { errors: [{ 
        description: 'A agência deve conter 4 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_AGENCY_NUMBER' 
      },{
        description: 'Dígito da conta não corresponde ao número da conta/agência preenchido', 
        code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH' 
      }]};
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

  describe("validate agency check number", function(){

    it("does NOT accept agency check number", function() {
      bankAccount.agencyCheckNumber = "1";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = { errors: [{ 
        description: 'O dígito da agência deve ser vazio', 
        code: 'INVALID_AGENCY_CHECK_NUMBER' 
      }]};
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });
  });

  describe("validate account number", function(){

    it("accepts a valid bank account", function() {
      Moip.BankAccount.validate(bankAccount);
      expect(bankAccount.valid).toHaveBeenCalled();
    });

    it("does NOT accept account less than nine digits", function() {
      bankAccount.accountNumber = "1234";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept account greater than nine digits", function() {
      bankAccount.accountNumber = "1234567890";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = { errors: [{ 
        description: 'A conta corrente deve conter 9 números. Complete com zeros a esquerda se necessário.', 
        code: 'INVALID_ACCOUNT_NUMBER' 
      }]};
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

    it("does NOT accept when calc account check number invalid", function() {
      bankAccount.accountCheckNumber = "0";
      Moip.BankAccount.validate(bankAccount);
      var expectedParams = { errors: [{ 
        description: 'Dígito da conta não corresponde ao número da conta/agência preenchido', 
        code: 'ACCOUNT_CHECK_NUMBER_DONT_MATCH' 
      }]};
      expect(bankAccount.invalid).toHaveBeenCalledWith(expectedParams);
    });

  });

});