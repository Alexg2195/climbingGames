$(document).ready(function () {
  var circleCount = 0;
  var touchCount = 0;
  var timerElement = null;
  var iconElement = null;

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
// 32 is spacebar

  $(document).keypress(function(e) {
    // console.log(e.which);

// Space bar takes away the circles as the player climbs

    if (e.which === 32) {
      touchCount++;
      $("#icon" + touchCount).addClass('zoomOut');
    };

// Sizes are changed by width (for icons) or font-size (for timer)
// 10 px is the amount of change atm

    if (e.which === 61 && timerElement) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which === 45 && timerElement) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which === 61 && iconElement) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }

    if (e.which === 45 && iconElement) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }
  });

  var bindSetupControls function () {
    
  }

  var bindGameControls function() {
    
  }

// gives the draggable functionality

  $(".draggable").draggable();
});