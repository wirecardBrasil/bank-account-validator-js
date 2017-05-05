(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function ItauCheckNumberCalculator() {
    if ( !( this instanceof ItauCheckNumberCalculator ) ) {
      return new ItauCheckNumberCalculator();
    }
  }

  ItauCheckNumberCalculator.prototype = {

    calculate: function(agencyNumber, accountNumber) {
      var numbers = (agencyNumber+accountNumber).split("");
      var sumSeq = 0;
      var sequence = 0;
      for (var i = 0; i < numbers.length; i++) {
        var number = parseInt(numbers[i]);
        sequence = this.multiplyAccordingParity(number, i);
        sequence = this.adjustAccordingLength(sequence);
        sumSeq += sequence;
      }
      return this.module(sumSeq);
    },

    multiplyAccordingParity: function(number, index) {
      return number * (index % 2 === 0 ? 2 : 1);
    },

    adjustAccordingLength: function(sequence) {
      if(sequence > 9) {
        var numbers = sequence.toString().split("");
        sequence = 0;
        for (var i = 0; i < numbers.length; i++) {
          sequence += parseInt(numbers[i]);
        }
      }
      return sequence;
    },

    module: function(sumSeq) {
      var module = sumSeq % 10;
      if(module === 0) {
        return "0";
      } else {
        return (10 - module).toString();
      }
    }
  };

  Moip.ItauCheckNumberCalculator = ItauCheckNumberCalculator();

})(window);