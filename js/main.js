$(document).ready(function () {
  var circleCount = 0;
  var touchCount = 0;
  var timerElement = null;
  var iconElement = null;
  var gameRunning = false;

// To added and subtract amount of circles in play
// logs variable for amount of circles shown

  $("#addCircle").on("click", function () {
    if (circleCount < 9 && gameRunning === false) {
      circleCount++;
      $("#icon" + circleCount).css("display", "inline-block");
    };
  });

  $("#minusCircle").on("click", function () {
    if (circleCount > 0 && gameRunning === false) {
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

// 13 = ENTER. Sets gameRunning variable to allow controls or not

    if (e.which === 13) {
      if (gameRunning === false) {
        gameRunning = true;
      } else {
        gameRunning = false;
      }
    };

// 92 = \ key. Will turn gameRunning variable off to stop game controls

    if (e.which === 92) {
      gameRunning = false;
      
    };

// Space bar takes away the circles as the player climbs

    if (e.which === 32 && gameRunning === true) {
      touchCount++;
      $("#icon" + touchCount).addClass('zoomOut');
    };

// Sizes are changed by width (for icons) or font-size (for timer)
// 10 px is the amount of change atm

    if (e.which === 61 && timerElement && gameRunning === false) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which === 45 && timerElement && gameRunning === false) {
      var newPxSize = parseInt($(".time").css("font-size"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $(".time").css("font-size", newPxSize);
      };
    }

    if (e.which === 61 && iconElement && gameRunning === false) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 <= newPxSize && newPxSize < 100) {
        newPxSize += 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }

    if (e.which === 45 && iconElement && gameRunning === false) {
      var newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
      if (30 < newPxSize && newPxSize <= 100) {
        newPxSize -= 10;
        newPxSize = newPxSize + "" + "px";
        $("#" + iconElement[0].id).css("width", newPxSize);
      };
    }
  });

// gives the draggable functionality

  $(".draggable").draggable();
});