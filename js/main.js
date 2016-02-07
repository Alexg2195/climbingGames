$(document).ready(function () {
  var circleCount = 1;
  var touchCount = 0;
  var timerElement = null;
  var iconElement = null;
  var gameRunning = false;

// Listening for keypresses
// 61 is (+=) key
// 45 is (-_) key
// 32 is spacebar
// 13 = ENTER
// 92 = \ key

  $(document).keypress(function(e) {
    // console.log(e.which);

// Sets gameRunning variable to allow controls or not

    if (e.which === 13) {
      if (gameRunning === false) {
        gameRunning = true;
        unbindDrag();
      } else {
        gameRunning = false;
        bindDrag();
      }
    };

// Will turn gameRunning variable off to stop game controls

    if (e.which === 92) {
      gameRunning = false;
      bindDrag();
    };

// Space bar takes away the circles as the player climbs

    if (e.which === 32 && gameRunning === true) {
      touchCount++;
      $("#icon" + touchCount).addClass('zoomOut');
      if (touchCount === circleCount) {
        startStop();
      };
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

// To added and subtract amount of circles in play
// logs variable for amount of circles shown

  $("#addCircle").on("click", function () {
    if (circleCount < 9 && gameRunning === false) {
      circleCount++;
      $("#icon" + circleCount).css("display", "inline-block");
    };
  });

  $("#minusCircle").on("click", function () {
    if (circleCount > 1 && gameRunning === false) {
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

// gives the draggable functionality
  
  var bindDrag = function () {
    $(".draggable").draggable({ disabled: false });
  }

  var unbindDrag = function () {
    $(".draggable").draggable({ disabled: true });
  }

  bindDrag();

// Timer

  var miliSec = 0;
  var sec = 0;
  var min = 0;
  var timer = 0;
  var timing = false;

  $(document).keypress(function (event) {
    // console.log(event.which);
    switch (event.which) {
      case 13:
        startStop();
        break;
      case 92:
        reset();
        break;
      default:
        break;
    }
  });

  function startStop () {
    if (!timing) {
      startTimer();
    } else {
      stopTimer();
    };
  };

  function stopTimer () {
    timing = false;
    clearInterval(timer);
  };

  function startTimer () {
    if (!timing) {
      timing = true;
      timer = setInterval(runStopWatch, 100);
    };
  };

  function runStopWatch () {
    miliSec += 10;

    if (miliSec > 99) {
      miliSec = 0;
      sec ++;
    };

    if (sec > 59) {
      sec = 0;
      min ++;
    };

    printTime();
  };

  function reset () {
    if (timing) {
      stopTimer();
    };
    miliSec = 0;
    sec = 0;
    min = 0;
    printTime();
  };

  function printTime (argument) {
    $(".min").text(pad(min));
    $(".sec").text(pad(sec));
    $(".miliSec").text(pad(miliSec));
  };

  function pad(num) {
    var newNum = num.toString();
    while (newNum.length < 2) newNum = "0" + newNum;
    return newNum;
  };
});