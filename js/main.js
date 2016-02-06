$(document).ready(function () {
  var circleCount = 0;
  var timerElement = null;
  var iconElement = null;

// Logging mouse over data for the timer and icons as a variable

  $('#myStopWatch').on('mouseover', function(e) {
    timerElement = $(e.currentTarget);
  });

  $('#myStopWatch').on('mouseout', function(e) {
    timerElement = null;
  });

  $('.icon').on('mouseover', function(e) {
    iconElement = $(e.currentTarget);
  });

  $('.icon').on('mouseout', function(e) {
    iconElement = null;
  });

// Listening for keypresses
// 61 is (+=) key
// 45 is (-_) key
// Sizes are changed by width (for icons) or font-size (for timer)
// 10 px is the amount of change atm

  $(document).keypress(function(e) {
    if (e.which == 61 && timerElement) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which == 45 && timerElement) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which == 61 && iconElement) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }

    if (e.which == 45 && iconElement) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }
  });

// To added and subtract amount of circles in play
// logs variable for amount of circles shown

  $("#addCircle").on("click", function () {
    if (circleCount < 9) {
      circleCount++;
      $("#icon" + circleCount).css("display", "inline-block");
    };
  });

  $("#minusCircle").on("click", function () {
    if (circleCount > 0) {
      $("#icon" + circleCount).css("display", "none");
      circleCount--;
    };
  });

// gives the draggable functionality

  $(".draggable").draggable();
})