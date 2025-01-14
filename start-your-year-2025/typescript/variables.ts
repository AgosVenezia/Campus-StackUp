// Variables in Javascript

let foo1 = "Hi";

{
  var foo2 = "Hello";
  let foo1 = "Goodbye!";
  const foo3 = "I am only here"
  let foo4 = "I am only here as well"
}

// But foo3 and foo4 cannot be called here.
console.log(foo1, foo2, foo3, foo4)