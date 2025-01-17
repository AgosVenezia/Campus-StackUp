let variable = "foo"; // this is a string
variable = 0; // variable is reassigned as a number
variable = false; // variable is reassigned as a boolean
variable = 0.1; // variable is reassigned as a number

let foo = variable + 12;
foo = foo + " this is twelve and ";
foo = foo + 0;
console.log(foo);

const foo2 = "11";
console.log("With subtraction: ", foo2 - 2);
console.log("With addition: ", foo2 + 2);

function addATrueNumber(x, y) {
  if ((typeof x === "number") && (typeof y === "number")) {
    return x + y;
  }
  throw new Error("One of the inputs is not a number", {
    cause: "Not a number.",
  });
}

const aTrueNumber = addATrueNumber(12, 12);
console.log(aTrueNumber);
const notATrueNumber = addATrueNumber(12, "12");
