/*if (import.meta.main) {
  Deno.serve((_req_) => {
    (async () => {
      for await (const el of Deno.readDir(".")) {
        console.log(el.name);
      }
    })();
    const hello = new Response("Hello, World!");
    return hello;
  });
}*/

/*import { mutiplyWords } from "./utils/multiply-words.ts";

if (import.meta.main) {
  const multipliedWords = mutiplyWords(Deno.args[0].trim(), Number.parseInt(Deno.args[1].trim()));
  console.log(multipliedWords)
}*/

/*import { Application, Router } from "jsr:@oak/oak@17.1.3";
const router = new Router();
const app = new Application();

router.get("/", (ctx) => {
    ctx.response.body = "Hello, World!";
})

app.use(router.allowedMethods());
app.use(router.routes());

if (import.meta.main) {
    app.listen({ port: 8080 });
}*/

/*import { hello } from "https://gist.githubusercontent.com/uncomfyhalomacro/b5de275dfcbaeff1d2d89739541e4e6f/raw/648e323e4ab872cc2a6eeafdd1ccf46d8f6c6301/mod.ts";

if (import.meta.main) {
  hello();
}*/

/*//import { mutiplyWords } from "multiply-words";
import { mutiplyWords } from "./utils/multiply-words.ts";

if (import.meta.main) {
  const multipliedWords = mutiplyWords(Deno.args[0].trim(), Number.parseInt(Deno.args[1].trim()));
  console.log(multipliedWords)
}*/

/*import { mutiplyWords } from "./utils/multiply-words.ts";

if (import.meta.main) {
  const multipliedWords = mutiplyWords(
    Deno.args[0].trim(),
    Number.parseInt(Deno.args[1].trim()),
  );
  console.log(
    multipliedWords,
  );
}*/

/*function foo(s: any): any {
  return "foo"
}

if (import.meta.main) {
  let foobar = "bar";
  const barsoap = 0;
  console.log(foo("foo"), foobar);
}*/

if (import.meta.main) {
  Deno.serve((_req_) => {
    (async () => {
      for await (const el of Deno.readDir(".")) {
        console.log(el.name);
      }
    })();
    //const hello = new Response("Hello, World!");
    const hello = new Response("Hello, Stackie!");
    return hello;
  });
}