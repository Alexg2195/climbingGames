$(document).ready(function () {
  var miliSec = 0;
  var sec = 0;
  var min = 0;
  var timer = 0;

  $(document).on("click", "#startTimer", function () {
    timer = setInterval(runStopWatch, 100);
  });

  $(document).on("click", "#stopTimer", function () {
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

    console.log(miliSec);
    console.log(sec);
    console.log(min);
  };
})