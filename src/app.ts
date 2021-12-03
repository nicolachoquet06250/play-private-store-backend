//@ts-ignore erreur d'ide
import { App } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

//@ts-ignore erreur d'ide
import { PageNotFound } from "./errors/index.ts";
//@ts-ignore erreur d'ide
import { /*HomeArea, */CoreArea, UserArea, AppArea } from "./areas/index.ts";
//@ts-ignore erreur d'ide
import { WebsocketMiddleware } from "./middlewares/index.ts";

const app = new App({
  areas: [/*HomeArea, */UserArea, AppArea, CoreArea],
  logging: false,
});

app.use(/^\/ws$/, new WebsocketMiddleware());
app.use(/\/(.*)/, new PageNotFound(app.routes));

app.listen({
  port: 8001,
  hostname: '0.0.0.0'
});
