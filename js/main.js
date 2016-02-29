$(document).ready(function () {
  var circleCount = 1;
  var touchCount = 0;
  var timerElement = null;
  var iconElement = null;
  var newPxSize = 0;

  var gameState = 1;
  // gameState 0 = intro instruction page ***future***
  // gameState 1 = user input game setup
  // gameState 2 = countdown timer running
  // gameState 3 = game running
  // gameState 4 = name input
  // gameState 5 = scoreboard showing

  bindDrag();


// Listening for keypresses

  $(document).keypress(function (event) {
    // console.log(event.which);
    switch (event.which) {
      case 13: // ENTER
        if (gameState === 1) {
          startGame();
        };
        break;
      case 92: // \ key
        resetGame();
        break;
      case 32: // SPACEBAR
        if (gameState === 3) {
          pointScored();
        };
        break;
      case 61: // (+=) key
        if (gameState === 1) {
          if (timerElement) {
            biggerTimer();
          };
          if (iconElement) {
            biggerElement();
          };
        };
        break;
      case 45: // (-_) key
        if (gameState === 1) {
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


// Functions

  function startGame () {
    gameState = 2;
    unbindDrag();         //Kills draggable controls
    countDown();          //Starts Countdown
  }

  function resetGame () {
    gameState = 1;
    resetTimer();         //Resets Timer
    bindDrag();           //Enables draggable controls
    resetCircles();       //Resets Circles
    changeDisplay();
  }

  function pointScored () {
    sound.play("hit");
    touchCount++;
    $("#icon" + touchCount).addClass('zoomOut');
    if (touchCount === circleCount) {
      completedGame();
    };
  }

  function completedGame () {
    gameState = 4;              //changed game state to name input
    stopTimer();
    changeDisplay();
  }

  function resetCircles () {
    for (var i = touchCount; i > 0; i--) {
        $("#icon" + i).removeClass('zoomOut');
      };
    touchCount = 0;
  }

  $("#inputNameBtn").on("click", function () {
    var name = $('#inputNameField').val();
    $('#inputNameField').val("");
    addScore(name);
  });

  function changeDisplay () {
    if (gameState === 1) {
      $("#myStopWatch").css("display", "inline-block");
      $("#addCircle").css("display", "inline-block");
      $("#minusCircle").css("display", "inline-block");
    } else {
      $("#myStopWatch").css("display", "none");
      $("#addCircle").css("display", "none");
      $("#minusCircle").css("display", "none");
    }

    if (gameState === 4) {
      $("#inputScreen").css("display", "block");
      $("#inputNameField").focus();
    } else {
      $("#inputScreen").css("display", "none");
      $("#inputNameField").blur();
    }

    if (gameState === 5) {
      $("#leaderboard").css("display", "table");
    } else {
      $("#leaderboard").css("display", "none");
    }
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
    if (circleCount < 9 && gameState === 1) {
      circleCount++;
      $("#icon" + circleCount).css("display", "inline-block");
    };
  });

  $("#minusCircle").on("click", function () {
    if (circleCount > 1 && gameState === 1) {
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

  // Change element size functions

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


// Sounds

  var count = new Audio('sound/123.wav');
  var start = new Audio('sound/go.wav');
  var sound = new Howl({
    urls: ["sound/hit.wav"],
    sprite: {
      hit: [0,1000]
    }
  });

  function countDown () {
    var times = 3;
    var loop = setInterval(repeatSound, 800);

    function repeatSound () {
      if (gameState === 2) {
        if (times === 0) {
          $(".miliSec").text("GO");
          clearInterval(loop);
          start.play();
          gameState = 3;                  //Changes game State to game running (3);
          startTimer();                   //Starts Timer
        } else {
          $(".miliSec").text(pad(times));
          count.play();
        }
        times--;
      } else {
        clearInterval(loop);
        $(".miliSec").text("00");
      }
    }
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


// Leaderboard

  // Functions:
  // addScore
  // showScores

  var leaderBoardSize = 20;
  var scores = [];
  var newScore = [];
  var insertLocation = null;
  var addNewScore = true;

  function addScore (playerName) {

    if (playerName === "") {
      showScores();
      return;
    }

    newScore = [playerName, min, sec, miliSec];

    if (scores.length === 0) {
      scores.push(newScore);
      showScores();
      return;
    }

    console.log(scores);

    for (var i = scores.length - 1; i >= 0; i--) {
      if (scores[i][0] === playerName) {
        addNewScore = false;
        if (scores[i][1] >= min) {
          if (scores[i][2] >= sec) {
            if (scores[i][3] >= miliSec) {
              scores.splice(i, 1);
              addNewScore = true;
            }
          }
        }
      }
    }

    if (addNewScore) {
      for (var i = scores.length - 1; i >= 0; i--) {

        if (scores[i][1] < min) {
          insertLocation = i + 1;
          break;
        }

        if (scores[i][1] > min) {
          continue;
        }

        if (scores[i][2] < sec) {
          insertLocation = i + 1;
          break;
        }

        if (scores[i][2] > sec) {
          continue;
        }

        if (scores[i][3] < miliSec) {
          insertLocation = i + 1;
          break;
        }

        if (scores[i][3] > miliSec) {
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
    }

    insertLocation = null;
    addNewScore = true;
    showScores();
  }

  function showScores () {
    $("#leaderboardBody").empty();
    for (var i = 0; i < scores.length; i++) {
      var newRow = buildRow(i, scores[i]);

      $("#leaderboardBody").append(newRow);
    };
    gameState = 5;
    changeDisplay();
  }

  function buildRow (num, data) {
    var row = $("<tr>")
    var number = $("<td>").append(num + 1 + "");
    var name = $("<td>").append(data[0]);
    var time = $("<td>").append(pad(data[1]) + ":" + pad(data[2]) + ":" + pad(data[3]));

    row.append(number).append(name).append(time);

    return row;
  }

});






// ---------------------------------------------------------------------------------------------------



























