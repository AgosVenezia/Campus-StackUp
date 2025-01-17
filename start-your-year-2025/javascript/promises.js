let promise = new Promise(function (resolve, reject) {
  let success = true; // Change this to false to test the rejection

  if (success) {
    resolve("Operation was successful!");
  } else {
    reject("Operation failed.");
  }
});

console.log(await promise);

/*
 * Handrolled version of setTimeOut.
 */
const customSetTimeOut = (x) =>
  new Promise((resolve, reject) => {
    if ((typeof x) !== "number") {
      const errorVal = new Error("Not a number", {
        cause: "Value is not a number.",
      });
      return reject({
        errorVal,
        value: x,
      });
    } else {
      const currentTime = new Date();
      const previousSeconds = currentTime.getTime();
      const fullFilledSeconds = previousSeconds + (x * 1000);

      let newTime = new Date();
      do {
        newTime = new Date();
      } while (newTime.getTime() < fullFilledSeconds + 1);
      return resolve(`Finished the ${x} seconds countdown!`);
    }
  });

customSetTimeOut("2 ").then((x) => console.log(x)).catch((err) => {
  console.error(err);
  console.log("Attempting to convert string to a number value!");
  // If it's not a number, set the timeout to 0. This just serves as an example.
  const number = !isNaN(err.value.trim())
    ? Number.parseInt(err.value.trim())
    : 0;
  customSetTimeOut(number); // we will not handle the error here for now
  console.log(`Conversion successful. Timeout lasted in ${number} seconds`);
});
