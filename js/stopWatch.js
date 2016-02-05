$(document).ready(function () {
  var miliSec = 0;
  var sec = 0;
  var min = 0;
  var timer = 0;
  var timing = false;

  $(document).on("click", "#startTimer", function () {
    if (!timing) {
      timing = true;
      timer = setInterval(runStopWatch, 100);
    };
  });

  $(document).on("click", "#stopTimer", function () {
    timing = false;
    clearInterval(timer);
  });

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

  $(document).on("click", "#resetTimer", function () {
    miliSec = 0;
    sec = 0;
    min = 0;
    printTime();
  });

  function printTime (argument) {
    $(".min").text(min);
    $(".sec").text(sec);
    $(".miliSec").text(miliSec);
  }
})