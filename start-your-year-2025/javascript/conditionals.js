const veryTrue = true;
const veryFalse = false;

if (veryTrue) {
  console.log("Very True");
}

if (!veryFalse) {
  console.log("Very False");
}

function divide(x, y) {
  if (y === 0) {
    throw new Error(
      `Division by zero. Tried to operate ${x} with divisor ${y}.`,
      { cause: "Division by zero." },
    );
  }
  return x / y;
}

try {
  const quotient1 = divide(100, 10);
  const quotient2 = divide(10, 0);
  console.log(quotient1, quotient2);
} catch (err) {
  if (err instanceof Error) {
    console.error(err.message);
  } else {
    console.error(`Unknown error ${err}.`);
  }
}

switch (!veryFalse) {
  case false:
    console.log("False");
    break;
  case true:
    console.log("True");
    break;
  default:
    console.error(veryFalse);
}

const x = "w";
switch (x) {
  case "wow":
    console.log(x);
    break;
  case 2:
    console.log(x);
    break;
  default:
    throw new Error("Not 2 or wow.");
}