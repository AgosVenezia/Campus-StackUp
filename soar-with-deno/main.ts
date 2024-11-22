if (import.meta.main) {
  Deno.serve((_req_) => {
    (async () => {
      for await (const el of Deno.readDir(".")) {
        console.log(el.name);
      }
    })();
    const hello = new Response("Hello, World!");
    return hello;
  });
}