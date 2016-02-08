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
    showGame();
  }

  function pointScored ( ) {
    hit.play();
    touchCount++;
    $("#icon" + touchCount).addClass('zoomOut');
    if (touchCount === circleCount) {
      completedGame();
    };
  }

  function completedGame () {
    gameRunning = false;
    stopTimer();
    addScore();
    showScores();
  }

  function showGame () {
    $("#myStopWatch").css("display", "inline-block");
    $("#addCircle").css("display", "inline-block");
    $("#minusCircle").css("display", "inline-block");
    $("#leaderboard").css("display", "none");
  }

  function showLeaderboard () {
    $("#myStopWatch").css("display", "none");
    $("#addCircle").css("display", "none");
    $("#minusCircle").css("display", "none");
    $("#leaderboard").css("display", "table");
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
  
  function bindDrag () {
    $(".draggable").draggable({ disabled: false });
  }

  function unbindDrag () {
    $(".draggable").draggable({ disabled: true });
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

// Leaderboard

  // Functions:
  // addScore
  // showScores

  var leaderBoardSize = 10;
  var scores = [];
  var playerName = "";
  var newScore = {};
  var insertLocation = null;

  function addScore () {
    playerName = getPlayerName();

    if (playerName === "") {
      return;
    }

    newScore = {
      "playerName": playerName,
      "minute": min,
      "second": sec,
      "miliSecond": miliSec
    }

    if (scores.length === 0) {
      scores.push(newScore);
      return;
    }

    for (var i = scores.length - 1; i >= 0; i--) {

      if (scores[i].minute < min) {
        insertLocation = i + 1;
        break;
      }

      if (scores[i].minute > min) {
        continue;
      }

      if (scores[i].second < sec) {
        insertLocation = i + 1;
        break;
      }

      if (scores[i].second > sec) {
        continue;
      }

      if (scores[i].miliSecond < miliSec) {
        insertLocation = i + 1;
        break;
      }

      if (scores[i].miliSecond > miliSec) {
        continue;
      }

    };

    if (insertLocation === null) {
      insertLocation = 0;
    }

    scores.splice(insertLocation, 0, newScore);

    if (scores.length > leaderBoardSize) {
      scores.pop();
    }

    insertLocation = null;
  }

  function getPlayerName () {
    return(prompt("Name:"));
  }

  function showScores () {
    $("#leaderboardBody").empty();
    for (var i = 0; i < scores.length; i++) {
      var newRow = buildRow(i, scores[i]);

      $("#leaderboardBody").append(newRow);
    };
    showLeaderboard();
  }

  function buildRow (num, data) {
    var row = $("<tr>")
    var number = $("<td>").append(num + 1 + "");
    var name = $("<td>").append(data.playerName);
    var time = $("<td>").append(pad(data.minute) + ":" + pad(data.second) + ":" + pad(data.miliSecond));

    row.append(number).append(name).append(time);

    return row;
  }

});