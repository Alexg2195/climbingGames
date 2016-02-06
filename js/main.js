$(document).ready(function () {
  var timerElement = null;

  $('#myStopWatch').on('mouseover', function(e) {
      timerElement = $(e.currentTarget);
  });

  $('#myStopWatch').on('mouseout', function(e) {
      timerElement = null;
  });

  $(document).keypress(function(e) {
      if (e.which == 61 && timerElement) {
        var newPxSize = parseInt($(".time").css("font-size"));
        if (30 > newPxSize < 100) {
          newPxSize += 10;
          console.log(newPxSize);
          newPxSize = newPxSize + "" + "px";
          console.log(newPxSize);
          $(".time").css("font-size", newPxSize);
        };
      }

      if (e.which == 45 && timerElement) {
        var newPxSize = parseInt($(".time").css("font-size"));
        if (30 > newPxSize < 100) {
          newPxSize -= 10;
          console.log(newPxSize);
          newPxSize = newPxSize + "" + "px";
          console.log(newPxSize);
          $(".time").css("font-size", newPxSize);
        };
      }
  });

  $(".draggable").draggable();
})