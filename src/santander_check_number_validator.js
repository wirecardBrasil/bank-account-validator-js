(function(window) {
  var Moip = window.Moip || {};
  window.Moip = Moip;

  function SantanderCheckNumberCalculator() {
    if ( !( this instanceof SantanderCheckNumberCalculator ) ) {
      return new SantanderCheckNumberCalculator();
    }
  }

  SantanderCheckNumberCalculator.prototype = {

    calculateAccount: function(agencyNumber,accountNumber) {
      var numbers = (agencyNumber + "00" + accountNumber).split("");
      var sumSeq = 0;
      
      for (var i = 0; i < numbers.length; i++) {
        var number = parseInt(numbers[i]);
        sumSeq += this.multiplyAccordingWeight(number, i);
      }
      sumSeq = parseInt(sumSeq.toString().substr(-1));
      if ( sumSeq === 0 ) return "0";
      else return (10 - sumSeq).toString();
    },

    multiplyAccordingWeight: function(number, index) {
      var weight = [9,7,3,1,0,0,9,7,1,3,1,9,7,3];
      var res = number * weight[index];
      return parseInt(res.toString().substr(-1))
    }
  };

  Moip.SantanderCheckNumberCalculator = SantanderCheckNumberCalculator();

})(window);