/*import { Hono } from "@hono/hono";
const app = new Hono();

app.get("/", (c) => c.text("Hono!"));

if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}*/

/*import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
const app = new Hono().basePath("/api");

interface SpeciesDetails {
  genus: string;
  species: string;
  full_name: string;
  habitats: Array<string>;
}

const MicrobialData: Record<string, SpeciesDetails | undefined> = {
  "helicobacter_pylori": {
    genus: "Helicobacter",
    species: "pylori",
    full_name: "Helicobacter pylori",
    habitats: [
      "aquatic",
      "human gut",
    ],
  },
  "escherichia_coli": {
    genus: "Escherichia",
    species: "coli",
    full_name: "Escherichia coli",
    habitats: [
      "aquatic",
      "human gut",
    ],
  },
};

app.get("/species/:name", (c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    return c.json(data);
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
}).delete((c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    MicrobialData[name] = undefined;
    return c.text(`Deleted ${name} in database`);
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
});

app.get("/species/:name/habitats", async (c) => {
  const { name } = c.req.param();
  const data = MicrobialData[name];
  if (data !== undefined) {
    const res = await app.request(`/api/species/${name}`);
    const data: SpeciesDetails | undefined = await res.json();
    if (data) {
      return c.json({ habitats: data.habitats });
    } else {
      throw new HTTPException(503, { message: "Server Error." });
    }
  } else {
    throw new HTTPException(404, { message: "Species not found in database." });
  }
});

if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}*/

/*import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import AnimalFactory from "./mock/factory.ts";

const factoryAnimals = AnimalFactory.createMany(10);

const app = new Hono().basePath("/api");

app.get("/animals", (c) => {
  return c.json(factoryAnimals);
});

app.get("/animals/:id", (c) => {
  const { id } = c.req.param();
  const animalDetails = factoryAnimals.find((el) => el.id === id);
  if (!animalDetails) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(animalDetails);
});

if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}*/

/*import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { factoryAnimals, factoryPeople } from "./mock/factory.ts";

const animals = new Hono().basePath("/animals");
const people = new Hono().basePath("/people");
const app = new Hono().basePath("/api");

animals.get("/", (c) => {
  return c.json(factoryAnimals);
});

animals.get("/:id", (c) => {
  const { id } = c.req.param();
  const animalDetails = factoryAnimals.find((el) => el.id === id);
  if (!animalDetails) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(animalDetails);
});

app.route("/", animals);

people.get("/", (c) => {
  return c.json(factoryPeople);
});

people.get("/:id", (c) => {
  const { id } = c.req.param();
  const personalDetail = factoryPeople.find((el) =>
    el.id === Number.parseInt(id)
  );
  if (!personalDetail) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(personalDetail);
});

app.route("/", people);

if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}*/

/*import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { factoryPeople } from "./mock/factory.ts";
import { animalDb, personalDetailsDb } from "./mock/database/mod.ts";
import { PersonalDetail } from "./types/inferred.ts";
import { create_animal_table_command } from "./mock/database/animal.db.ts";
import { create_people_table_command } from "./mock/database/personal-details.db.ts";
import { Animal } from "./types/inferred.ts";
import checkAuth from "./auth/checkAuth.ts";
import { PersonalDetailWithSalt } from "./types/common.ts";

if (animalDb.open) {
  animalDb.exec(create_animal_table_command);
}

if (personalDetailsDb.open) {
  personalDetailsDb.exec(create_people_table_command);
}

const animals = new Hono().basePath("/animals");
const people = new Hono().basePath("/people");
const app = new Hono().basePath("/api");

animals.use(checkAuth);
people.use(checkAuth);

animals.get("/", (c) => {
  const stmt = animalDb.prepare("SELECT * FROM pets;");
  const rows = stmt.all<Animal>();
  return c.json(rows);
}).put(async (c) => {
  const randUUID = crypto.randomUUID();
  const userInput = await c.req.json<{ animal: string; owner: string }>();
  const animal: Animal = {
    animal: userInput.animal,
    owner: userInput.owner,
    id: randUUID,
  };
  const stmt = animalDb.prepare(
    "INSERT INTO pets(id, owner, animal) VALUES (?, ?, ?);",
  );
  const changes = stmt.run(
    animal.id,
    animal.owner,
    animal.animal,
  );
  if (changes > 0) {
    return c.json(animal);
  } else {
    throw new HTTPException(500, {
      message: "Failed to write animal data to database.",
    });
  }
});

animals.get("/:id", (c) => {
  const { id } = c.req.param();
  const stmt = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
  const row = stmt.get<Animal>(id);
  if (!row) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(row);
}).put(async (c) => {
  const { id } = c.req.param();
  const userInput = await c.req.json<{
    owner: string;
  }>();
  const stmt = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
  const row = stmt.get<Animal>(id);
  if (!row) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  const stmt2 = animalDb.prepare("UPDATE pets SET owner = ? WHERE id = ?;");
  const changes = stmt2.run(userInput.owner, id);
  if (changes > 0) {
    const stmt3 = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
    const newRow = stmt3.get<Animal>(id);
    if (!newRow) {
      throw new HTTPException(404, {
        message: "ID not found.",
      });
    }
    return c.json(newRow);
  } else {
    throw new HTTPException(500, {
      message: "Failed to write animal data to database.",
    });
  }
});

app.route("/", animals);

people.get("/", (c) => {
  return c.json(factoryPeople);
});

people.get("/:id", (c) => {
  const { id } = c.req.param();
  const personalDetail = factoryPeople.find((el) =>
    el.id === Number.parseInt(id)
  );
  if (!personalDetail) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(personalDetail);
});

app.route("/", people);
if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}*/

import { Hono } from "@hono/hono";
import { HTTPException } from "@hono/hono/http-exception";
import { factoryPeople } from "./mock/factory.ts";
import { animalDb, personalDetailsDb } from "./mock/database/mod.ts";
import { create_animal_table_command } from "./mock/database/animal.db.ts";
import { create_people_table_command } from "./mock/database/personal-details.db.ts";
import { Animal } from "./types/inferred.ts";
import checkAuth from "./auth/checkAuth.ts";
import registerUser from "./middleware/register.ts";
import loginUser from "./middleware/login.ts";
import { PersonalDetailWithSalt } from "./types/common.ts";

if (animalDb.open) {
  animalDb.exec(create_animal_table_command);
}

if (personalDetailsDb.open) {
  personalDetailsDb.exec(create_people_table_command);
}

const admin = new Hono().basePath("/auth/admin");
const animals = new Hono().basePath("/api/animals");
const people = new Hono().basePath("/api/people");
const app = new Hono();

admin.post("/register", registerUser);
admin.post("/login", loginUser);
app.route("/", admin);

animals.use(checkAuth);
people.use(checkAuth);

animals.get("/", (c) => {
  const stmt = animalDb.prepare("SELECT * FROM pets;");
  const rows = stmt.all<Animal>();
  return c.json(rows);
}).put(async (c) => {
  const randUUID = crypto.randomUUID();
  const userInput = await c.req.json<{ animal: string; owner: string }>();
  const animal: Animal = {
    animal: userInput.animal,
    owner: userInput.owner,
    id: randUUID,
  };
  const stmt = animalDb.prepare(
    "INSERT INTO pets(id, owner, animal) VALUES (?, ?, ?);",
  );
  const changes = stmt.run(
    animal.id,
    animal.owner,
    animal.animal,
  );
  if (changes > 0) {
    return c.json(animal);
  } else {
    throw new HTTPException(500, {
      message: "Failed to write animal data to database.",
    });
  }
});

animals.get("/:id", (c) => {
  const { id } = c.req.param();
  const stmt = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
  const row = stmt.get<Animal>(id);
  if (!row) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(row);
}).put(async (c) => {
  const { id } = c.req.param();
  const userInput = await c.req.json<{
    owner: string;
  }>();
  const stmt = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
  const row = stmt.get<Animal>(id);
  if (!row) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  const stmt2 = animalDb.prepare("UPDATE pets SET owner = ? WHERE id = ?;");
  const changes = stmt2.run(userInput.owner, id);
  if (changes > 0) {
    const stmt3 = animalDb.prepare("SELECT * FROM pets WHERE id = ?;");
    const newRow = stmt3.get<Animal>(id);
    if (!newRow) {
      throw new HTTPException(404, {
        message: "ID not found.",
      });
    }
    return c.json(newRow);
  } else {
    throw new HTTPException(500, {
      message: "Failed to write animal data to database.",
    });
  }
});

app.route("/", animals);

people.get("/", (c) => {
  return c.json(factoryPeople);
});

people.get("/:id", (c) => {
  const { id } = c.req.param();
  const personalDetail = factoryPeople.find((el) =>
    el.id === Number.parseInt(id)
  );
  if (!personalDetail) {
    throw new HTTPException(404, {
      message: "ID not found.",
    });
  }
  return c.json(personalDetail);
}).delete((c) => {
  const { id } = c.req.param();
  const stmt = personalDetailsDb.prepare("SELECT * FROM people WHERE id = ?;");
  const row = stmt.get<PersonalDetailWithSalt>(id);
  if (!row) {
    throw new HTTPException(404, { message: "User not found." });
  }
  const deleteOperation = personalDetailsDb.prepare(
    "DELETE FROM people WHERE id = ?;",
  );
  const changes = deleteOperation.run(id);
  if (changes > 0) {
    return c.text(
      `User with email "${row.email}" has been deleted in the database.`,
    );
  }
  throw new HTTPException(503, {
    message: "Server error. Unable to delete user in the database.",
  });
});

app.route("/", people);

if (import.meta.main) {
  Deno.serve({ hostname: "127.0.0.1", port: 5555 }, app.fetch);
}