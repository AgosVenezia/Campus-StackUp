const MAX = 10;
for (let i = 0; i < MAX; i++) {
  console.log(i);
}

let d = 0;
while (d < MAX) {
  console.log(d);
  d++;
}

d = 0;
do {
  console.log(d);
  d++;
} while (d < MAX);

const arr = [1, 2, 3];
for (let i = 0; i < arr.length; i++) {
  console.log(i, arr[i]);
}

for (const key in arr) {
  console.log(key, arr[key]);
}

for (const val of arr) {
  console.log(val);
}

arr.forEach((x) => console.log(x));

for (const val of arr) {
  if (val >= 2) {
    console.log("Break here");
    break;
  }
}

const arr2 = [25, 100, 50, 150];

for (const val of arr2) {
  if (val === 100) {
    console.log("Continue if 100");
    continue;
  } else if (val === 50) {
    console.log("Break if 50");
    break;
  }
}

const arr3 = [10, 15, 2, 12, 26];
arr3.forEach((x) => {
  console.log(`Max iterations for i variable to cover: ${x}`);
  for (let i = 0; i < x; i++) {
    const i2 = i * 2;
    if (i2 > 5) {
      console.log("Break here!");
      console.log(`Value of i before break: ${i}`);
      break;
    } else if ((i % 2) === 0) {
      console.log("Continuing here!");
      continue;
    }
  }
});