//@ts-ignore erreur d'ide
import { App, CorsBuilder } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
//@ts-ignore erreur d'ide
import { WebsocketMiddleware } from "./middlewares/index.ts";

const app = new App({
  areas: [],
  logging: false,
});

app.use(/^\/ws$/, new WebsocketMiddleware());
app.use(/\//,
  new CorsBuilder()
    .WithOrigins("*")
    .AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader()
);

//@ts-ignore erreur d'ide
const { IP, PORT } = Deno.env.toObject()

app.listen({
  port: (PORT ? parseInt(PORT) : 8001),
  //@ts-ignore erreur d'ide
  hostname: (IP ?? '0.0.0.0')
});
