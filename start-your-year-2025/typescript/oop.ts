/*class Animal {
    constructor(name) {
      if (name === undefined) return this.name = "Unknown";
      return this.name = name;
    }
  }

  const newAnimal = new Animal("Weird");
  console.log(newAnimal);*/

class Animal {
  public name: string;

  constructor(name: string | undefined) {
    if (!name) {
      this.name = "Unknown";
    } else {
      this.name = name;
    }
  }
}

const newAnimal = new Animal(undefined);
console.log(newAnimal);

/*class Mammal extends Animal {
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
human.getSpecies();*/

class Mammal extends Animal {
  public genus: string;
  public species: string;
  public classification: string;
  constructor(
    name: string,
    genus: string | undefined,
    species: string | undefined,
  ) {
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

/*class Reptile extends Animal {
	private genus: string;
	public species: string;
	public classification: string;
	constructor(name: string, genus: string | undefined, species: string | undefined) {
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
  console.log(crocodile.#genus); // this will error. experiment by removing this line.
  crocodile.getSpecies();*/
