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
  //@ts-ignore erreur d'ide
  port: Deno.env.get('PORT') ?? 8001,
  //@ts-ignore erreur d'ide
  hostname: Deno.env.get('IP') ?? '0.0.0.0'
});
