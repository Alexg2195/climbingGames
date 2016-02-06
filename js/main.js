$(document).ready(function () {
  var element = null;

  $('#myStopWatch').on('mouseover', function(e) {
      element = $(e.currentTarget);
  });

  $('#myStopWatch').on('mouseout', function(e) {
      element = null;
  });

  $(document).keypress(function(e) {
      if (e.which == 61 && element) {
        var newPxSize = parseInt($(".time").css("font-size"));
        if (30 > newPxSize < 100) {
          newPxSize += 10;
          console.log(newPxSize);
          newPxSize = newPxSize + "" + "px";
          console.log(newPxSize);
          $(".time").css("font-size", newPxSize);
        };
      }

      if (e.which == 45 && element) {
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