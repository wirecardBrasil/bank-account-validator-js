(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function BancoDoBrasilCheckNumberCalculator() {
    if ( !( this instanceof BancoDoBrasilCheckNumberCalculator ) ) {
      return new BancoDoBrasilCheckNumberCalculator();
    }
  }

  BancoDoBrasilCheckNumberCalculator.prototype = {

    // Account validation
    calculateAccount: function(accountNumber) {
      var numbers = accountNumber.split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        seq = 9 - i;
        sumSeq += (parseInt(numbers[i]) * seq);
      }
      return this.module(sumSeq);
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
      return this.module(sumSeq);
    },

    module: function(sumSeq) {
      var result = 11 - (sumSeq % 11);
      if(result === 10) {
        return "X";
      } else {
        if (result === 11) {
          return "0";
        } else {
          return result.toString();
        }
      }
    }

  };

  Moip.BancoDoBrasilCheckNumberCalculator = BancoDoBrasilCheckNumberCalculator();

})(window);