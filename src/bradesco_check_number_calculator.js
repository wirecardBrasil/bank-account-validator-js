(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BradescoCheckNumberCalculator() {
    if ( !( this instanceof BradescoCheckNumberCalculator ) ) {
      return new BradescoCheckNumberCalculator();
    }
  }

  BradescoCheckNumberCalculator.prototype = {

    // Account validation
    calculateAccount: function(accountNumber) {
      var numbers = accountNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        var number = parseInt(numbers[i]);
        sumSeq += this.multiplyAccordingWeight(number, i);
      }
      return this.accountModule(sumSeq);
    },

    multiplyAccordingWeight: function(number, i) {
      var weight = [2,7,6,5,4,3,2];
      return number * weight[i];
    },

    accountModule: function(sumSeq) {
      var module = sumSeq % 11;
      if(module === 0) {
        return "0";
      } else {
        if (module === 1) {
          return "P";
        } else {
          return (11 - module).toString();
        }
      }
    },

    // Agency validation
    calculateAgency: function(agencyNumber) {
      var numbers = agencyNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        seq = 5 - i;
        sumSeq += (parseInt(numbers[i]) * seq);
      }
      return this.agencyModule(sumSeq);
    },

    agencyModule: function(sumSeq) {
      var result = 11 - (sumSeq % 11);
      if(result === 10) {
        return "P";
      } else {
        if (result === 11) {
          return "0";
        } else {
          return result.toString();
        }
      }
    },

  };

  Moip.BradescoCheckNumberCalculator = BradescoCheckNumberCalculator();

})(window);