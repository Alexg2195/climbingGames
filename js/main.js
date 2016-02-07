$(document).ready(function () {
  var circleCount = 1;
  var touchCount = 0;
  var timerElement = null;
  var iconElement = null;
  var gameRunning = false;
  var newPxSize = 0;

  bindDrag();

// Listening for keypresses

  $(document).keypress(function (event) {
    // console.log(event.which);
    switch (event.which) {
      case 13:                        // ENTER
        if (gameRunning === false) {
          startGame();
        };
        break;
      case 92:                        // \ key
        resetGame();
        break;
      case 32:                        // SPACEBAR
        if (gameRunning === true) {
          pointScored();
        };
        break;
      case 61:                        // (+=) key
        if (gameRunning === false) {
          if (timerElement) {
            biggerTimer();
          };
          if (iconElement) {
            biggerElement();
          };
        };
        break;
      case 45:                        // (-_) key
        if (gameRunning === false) {
          if (timerElement) {
            smallerTimer();
          };
          if (iconElement) {
            smallerElement();
          };
        };
        break;
      default:
        break;
    }
  });

// Sounds
  var count = new Audio('sound/123.wav');
  var start = new Audio('sound/go.wav');
  var hit = new Audio('sound/hit.wav');

  function countDown () {
    var times = 3;
    var loop = setInterval(repeatSound, 800);

    function repeatSound () {
      if (times === 0) {
        clearInterval(loop);
        start.play();
        startTimer();
      } else {
        count.play();
      }
      times--;
    }
  }

// Functions

  function startGame () {
    gameRunning = true;   //Kills most setup Controls
    unbindDrag();         //Kills draggable controls
    countDown();          //Starts Countdown
  }

  function resetGame () {
    resetTimer();         //Resets Timer
    gameRunning = false;  //Enables most Setup Controls
    bindDrag();           //Enables draggable controls
    resetCircles();       //Resets Circles
  }

  function pointScored () {
    hit.play();
    touchCount++;
    $("#icon" + touchCount).addClass('zoomOut');
    if (touchCount === circleCount) {
      completedGame();
    };
  }

  function completedGame () {
    stopTimer();
  }

  function resetCircles () {
    for (var i = touchCount; i > 0; i--) {
        $("#icon" + i).removeClass('zoomOut');
      };
    touchCount = 0;
  }

  function biggerTimer () {
    newPxSize = parseInt($(".time").css("font-size"));
    if (30 <= newPxSize && newPxSize < 100) {
      newPxSize += 10;
      newPxSize = newPxSize + "" + "px";
      $(".time").css("font-size", newPxSize);
    };
  }

  function smallerTimer () {
    newPxSize = parseInt($(".time").css("font-size"));
    if (30 < newPxSize && newPxSize <= 100) {
      newPxSize -= 10;
      newPxSize = newPxSize + "" + "px";
      $(".time").css("font-size", newPxSize);
    };
  }

  function biggerElement () {
    newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
    if (30 <= newPxSize && newPxSize < 100) {
      newPxSize += 10;
      newPxSize = newPxSize + "" + "px";
      $("#" + iconElement[0].id).css("width", newPxSize);
    };
  }

  function smallerElement () {
    newPxSize = parseInt($("#" + iconElement[0].id).css("width"));
    if (30 < newPxSize && newPxSize <= 100) {
      newPxSize -= 10;
      newPxSize = newPxSize + "" + "px";
      $("#" + iconElement[0].id).css("width", newPxSize);
    };
  }

// Button Click Listeners

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

// Hover Listeners

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

  // Gives the draggable functionality
  
  function bindDrag () {
    $(".draggable").draggable({ disabled: false });
  }

  function unbindDrag () {
    $(".draggable").draggable({ disabled: true });
  }

// Timer

  // Functions:
  // startTimer
  // stopTimer
  // resetTimer

  var miliSec = 0;
  var sec = 0;
  var min = 0;
  var timer = 0;
  var timing = false;

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

  function printTime () {
    $(".min").text(pad(min));
    $(".sec").text(pad(sec));
    $(".miliSec").text(pad(miliSec));
  };

  function pad(num) {
    var newNum = num.toString();
    while (newNum.length < 2) newNum = "0" + newNum;
    return newNum;
  };

  function resetTimer () {
    if (timing) {
      stopTimer();
    };
    miliSec = 0;
    sec = 0;
    min = 0;
    printTime();
  };

  function stopTimer () {
    timing = false;
    clearInterval(timer);
  };
});