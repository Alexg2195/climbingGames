$(document).ready(function () {
  var miliSec = 0;
  var sec = 0;
  var min = 0;
  var timer = 0;
  var timing = false;
  var points = 0;

  $(document).keypress(function (event) {
    // console.log(event.which);
    switch (event.which) {
      case 13:
        startStop();
        break;
      case 92:
        reset();
        break;
      case 32:
        incPoints();
        break;
      default:
        break;
    }
  });

  function incPoints () {
    points++;
    console.log(points);
  }

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