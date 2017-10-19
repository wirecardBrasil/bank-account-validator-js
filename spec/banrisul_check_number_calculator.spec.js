describe("BanrisulCheckNumberCalculator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      accountNumber      : "358507671",
      accountCheckNumber : "8"
    };

    bankAccountModuleOne = {
      accountNumber      : "358507670",
      accountCheckNumber : "6"
    };

    bankAccountModuleZero = {
      accountNumber      : "358507675",
      accountCheckNumber : "0"
    };
  });

  describe("validate Banrisul account number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculate(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number with module one", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculate(bankAccountModuleOne.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOne.accountCheckNumber);
    });

    it("should correctly calculate the check number with module zero", function() {
      checkNumberCalculated = Moip.BanrisulCheckNumberCalculator.calculate(bankAccountModuleZero.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.accountCheckNumber);
    });
  });

});