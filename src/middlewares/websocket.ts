//@ts-ignore erreur d'ide
import { HttpContext, PreRequestMiddleware } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";
//@ts-ignore erreur d'ide
import { ChatHandler } from "./chat.handler.ts";

export class WebsocketMiddleware implements PreRequestMiddleware {
    onPreRequest(context: HttpContext) {
        const { request, respondWith } = context.request.serverRequest;

        if (request.headers.get("upgrade") != "websocket") {
            return respondWith(
                new Response("not trying to upgrade as websocket.", { status: 400 }),
            );
        }

        //@ts-ignore L'ide ne trouve pas Deno
        const { socket, response } = Deno.upgradeWebSocket(request);

        ChatHandler(socket);
        respondWith(response);

        context.response.setNotRespond();
    }
}