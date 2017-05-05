describe("ItauCheckNumberCalculator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      agencyNumber       : "2545",
      accountNumber      : "02366",
      accountCheckNumber : "1"
    };

    bankAccountModuleZero = {
      agencyNumber       : "1874",
      accountNumber      : "10009",
      accountCheckNumber : "0"
    };
  });

  describe("validate Itaú account number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.ItauCheckNumberCalculator.calculate(bankAccount.agencyNumber, bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number with module zero", function() {
      checkNumberCalculated = Moip.ItauCheckNumberCalculator.calculate(bankAccountModuleZero.agencyNumber, bankAccountModuleZero.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.accountCheckNumber);
    });
  });

});