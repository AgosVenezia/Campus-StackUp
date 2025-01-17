const x = [1, 2]; // an array
const y = {
  key: "pair",
  date: new Date(),
  generateDate() {
    this.date = new Date();
  },
}; // a key-value pair or a dictionary or object

console.log(x, typeof x);
console.log(y, typeof y);
y.generateDate();
console.log(y);

/*type Person = {
	age: number,
	name: {
		first: string,
		last: string,
		updateFirstName: Function
	}
}*/

/*let person: Person = {
  age: 20,
  name: {
    first: "John",
    last: "River",
    updateFirstName: function (x: string) {
		this.first = x
	}
  }
}
console.log(person);
person.name.updateFirstName("Jonathan");
console.log(person);*/

/*let person = {
    age: 20,
    name: {
      first: "John",
      last: "River",
      updateFirstName: function (x: string) {
          this.first = x
      }
    }
  }
  console.log(person);
  person.name.updateFirstName("Jonathan");
  console.log(person);
  console.log(typeof person)*/

class Person {
  public age: number;
  public name: {
    first: string;
    last: string;
    updateFirstName: Function;
  };
  constructor(age: number, firstName: string, lastName: string) {
    this.age = age;
    this.name = {
      first: firstName,
      last: lastName,
      updateFirstName: (x: string) => {
        this.name.first = x;
      },
    };
  }
}

let person = new Person(20, "John", "River");
console.log(person);
person.name.updateFirstName("Jonathan");
console.log(person);
console.log(typeof person);

console.log(person instanceof Person);
