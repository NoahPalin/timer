/*This function takes prints a dot after each interval of time has passed.
times: an array of times that is used to determine when to print a dot.*/
const timer = function(times) {

  //Calls arrayPreparation to remove strings, negative numbers, etc, from the times array.
  let actualTimes = arrayPreparation(times);

  //Returns no output to the user if the times array is empty.
  if (actualTimes.length === 0) {
    return;
  }

  //Sets a timer to print a dot.
  for (let i of actualTimes) {
    setTimeout(() => {
      process.stdout.write(".");
    }, i * 1000); //Multiplied by 1000 since each element in the times array is in milliseconds.
  }

  //Prints a blank line after all the dots have been printed.
  setTimeout(() => {
    console.log();
  }, actualTimes[0] * 1000);
};



/*This function sets up the times array by removing any negative numbers and strings that the
user may have passed into the timer function.
times: the array of times the user inputted into the timer function.*/
const arrayPreparation = function(times) {

  //Converts the array to integers.
  times = times.map(str => {
    return parseInt(str);
  });

  //Bubble sort to order the array from greatest to least.
  let placeHolder;
  for (let n = 0; n < times.length; n++) {
    for (let p = 0; p <= times.length; p++) {
      if (times[n] > times[p]) {
        placeHolder = times[n];
        times[n] = times[p];
        times[p] = placeHolder;
      }
    }
  }

  //Removes all nagative numbers from the times array.
  for (let c = 0; c < times.length; c++) {
    if (times[c] < 0) {
      times.splice(c, times.length);
    }
  }

  //Removes any value that is NaN (this value would exist if the user had input a string).
  for (let b = 0; b < times.length; b++) {
    if (isNaN(times[b])) {
      times.splice(b, 1);
    }
  }
  //Return an array of times that only contains positive integers (or 0).
  return times;
};

//Saves input from the user and removes the first two elements that won't be used in this function.
let times = process.argv;
times.splice(0, 2);

//Calls the timer function.
timer(times);