//@ts-ignore erreur d'ide
import { User, IUser } from '../models/index.ts';

import { 
    Area, Param,
    Controller, Get,
    Post, Body
    //@ts-ignore erreur d'ide
} from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

@Controller('/user')
class UserController {

    @Get('s')
    getAllUsers(): Response {
        return new Response(JSON.stringify(User.getAll()), {
            headers: {
                ['Content-Type']: 'application/json'
            }
        })
    }

    @Get('/:email/:password')
    getFromEmailAndPassword(
        @Param("email") email: string, 
        @Param("password") password: string
    ): IUser|Response {
        return User.getFromEmailAndPassword(email, password) ?? new Response(
                JSON.stringify({
                    status: 404,
                    message: `L'utilisateur recherché n'existe pas`
                }), {
                    status: 404,
                    headers: {
                        ['Content-Type']: 'application/json'
                    }
                }
            );
    }

    @Post('')
    createUser(@Body() user: IUser) {
        return new Response(
            JSON.stringify({
                message: `L'utilisateur ${user.firstname} ${user.lastname} à bien été créé`
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
    controllers: [UserController],
})
export class UserArea {}
  