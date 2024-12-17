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

import { Hono } from "@hono/hono";
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
}