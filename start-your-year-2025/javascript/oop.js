class Animal {
  constructor(name) {
    if (name === undefined) return this.name = "Unknown";
    return this.name = name;
  }
}

const newAnimal = new Animal("Weird");
console.log(newAnimal);

class Mammal extends Animal {
  constructor(name, genus, species) {
    super(name);
    if (genus === undefined || species === undefined) {
      throw new Error("No species added.", { cause: "Invalid input." });
    } else {
      this.genus = genus;
      this.species = species;
    }
    this.classification = "Mammalia";
  }
  getSpecies() {
    console.log(`${this.genus} ${this.species}`);
  }
}

const human = new Mammal("Stackie", "Homo", "sapiens");
console.log(human.name);
human.getSpecies();

class Reptile extends Animal {
  #genus;
  constructor(name, genus, species) {
    super(name);
    if (genus === undefined || species === undefined) {
      throw new Error("No species added.", { cause: "Invalid input." });
    } else {
      this.#genus = genus;
      this.species = species;
    }
    this.classification = "Reptilia";
  }
  getSpecies() {
    console.log(`${this.#genus} ${this.species}`);
  }
}

const crocodile = new Reptile("Angel", "Crocodylus", "novaeguineae");
//console.log(crocodile.#genus); // this will error. experiment by removing this line.
crocodile.getSpecies();
