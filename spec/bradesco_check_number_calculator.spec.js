describe("BradescoCheckNumberCalculator", function() {

  var bankAccount;

  beforeEach(function() { 
    bankAccount = {
      agencyNumber        : "1425",
      agencyCheckNumber   : "7",
      accountNumber       : "0238069",
      accountCheckNumber  : "2"
    };

    bankAccountResultTen = {
      agencyNumber        : "8221",
      agencyCheckNumber   : "P",
      accountNumber       : "0301357",
      accountCheckNumber  : "2"
    };

    bankAccountResultEleven = {
      agencyNumber        : "8212",
      agencyCheckNumber   : "0",
      accountNumber       : "0301357",
      accountCheckNumber  : "P"
    };

    bankAccountModuleOne = {
      agencyNumber        : "9708",
      accountNumber       : "0301357",
      accountCheckNumber  : "P"
    };

    bankAccountModuleZero = {
      agencyNumber        : "1453",
      accountNumber       : "0325620",
      accountCheckNumber  : "0"
    };

  });

  describe("validate Bradesco agency number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAgency(bankAccount.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.agencyCheckNumber);
    });

    it("should correctly calculate the check number when result equal ten", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAgency(bankAccountResultTen.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountResultTen.agencyCheckNumber);
    });

    it("should correctly calculate the check number when result equal ten and lowercase", function() {
      bankAccountResultTen.agencyCheckNumber = "p";
      expect(Moip.BradescoValidator.agencyCheckNumberMatch(bankAccountResultTen)).toBeTruthy();
    });

    it("should correctly calculate the check number when result equal eleven", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAgency(bankAccountResultEleven.agencyNumber);
      expect(checkNumberCalculated).toEqual(bankAccountResultEleven.agencyCheckNumber);
    });

  });

  describe("validate Bradesco account number", function() {

    it("should correctly calculate the check number", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAccount(bankAccount.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccount.accountCheckNumber);
    });

    it("should correctly calculate the check number when module equal zero", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAccount(bankAccountModuleZero.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleZero.accountCheckNumber);
    });

    it("should correctly calculate the check number when module equal one", function() {
      checkNumberCalculated = Moip.BradescoCheckNumberCalculator.calculateAccount(bankAccountModuleOne.accountNumber);
      expect(checkNumberCalculated).toEqual(bankAccountModuleOne.accountCheckNumber);
    });

    it("should correctly calculate the check number when module equal one and lowercase", function() {
      bankAccountModuleOne.accountCheckNumber = "p";
      expect(Moip.BradescoValidator.accountCheckNumberMatch(bankAccountModuleOne)).toBeTruthy();
    });
  });

});