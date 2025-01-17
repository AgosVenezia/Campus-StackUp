// Define the plus function
function plus(
  x: number | string | undefined,
  y: number | string | undefined,
): number | string | undefined {
  // Return undefined if either x or y is undefined
  if (x === undefined || y === undefined) {
    return undefined;
  }

  // Handle cases where both are numbers
  if (typeof x === "number" && typeof y === "number") {
    return x + y;
  }

  // Handle cases where both are strings
  if (typeof x === "string" && typeof y === "string") {
    return x + y;
  }

  // If types do not match, return undefined
  return undefined;
}

// Test cases
console.log(plus(2025, 1)); // Expected output: 2026
console.log(plus(undefined, 21)); // Expected output: undefined
console.log(plus("StackUp", "Learn")); // Expected output: "StackUpLearn"
