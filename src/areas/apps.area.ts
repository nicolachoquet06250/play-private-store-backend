//@ts-ignore erreur d'ide
import { App, IApp } from '../models/index.ts';

import { 
    Area, Param,
    Controller, Get,
    Post, Body
    //@ts-ignore erreur d'ide
} from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

@Controller('/app')
class AppController {

    @Get('s')
    getAllApps(): Response {
        return new Response(JSON.stringify(App.getAll()), {
            headers: {
                ['Content-Type']: 'application/json'
            }
        })
    }

    @Get('/:id')
    getFromId(@Param('id') id: string): IApp|Response {
        return App.getFromId(parseInt(id)) ?? new Response(
            JSON.stringify({
                status: 404,
                message: `L'application recherchée n'existe pas`
            }), {
                status: 404,
                headers: {
                    ['Content-Type']: 'application/json'
                }
            }
        );
    }
    
    @Post('')
    createApp(@Body() app: IApp) {
        //console.log(app);
        return new Response(
            JSON.stringify({
                message: `L'application "${app.name}" à bien été créée`
            }), {
                status: 201,
                headers: {
                    ['Content-Type']: 'application/json'
                }
            }
        );
    }
}

@Area({
    controllers: [AppController],
})
export class AppArea {}
  