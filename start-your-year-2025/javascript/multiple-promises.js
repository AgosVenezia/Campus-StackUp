const arr = [];
for (let i = 2; i < 100; i += 2) {
  const promise = new Promise((resolve, reject) => {
    if ((i % 2) === 0) {
      return resolve(i + 2);
    }
    return reject(-100);
  });
  arr.push(promise);
}

console.log(arr);

for (const element of arr) {
  const val = await element;
  console.log(val);
}

for await (const element of arr) {
  console.log(element);
}

Promise.all(arr).then((values) => {
  values.forEach((value) => console.log("From Promise.all", value));
}).catch((err) => console.error(err));
