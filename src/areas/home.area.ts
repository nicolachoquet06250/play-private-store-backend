//@ts-ignore erreur d'ide
import { IUser, User } from '../models/index.ts';

import { 
    Area, Content, 
    Controller, Get, 
    QueryParam, Param
    //@ts-ignore erreur d'ide
} from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

interface GetHomeResponse {
  Hello: string
}

//@Controller("/home")
class HomeController {

  @Get("/hello")
  helloWorld(
      @QueryParam("name") name: string
  ): IUser {
      /*const response: GetHomeResponse = {
          Hello: name
      };*/

      return new User(0, name, 'Choquet', 'nchoquet@norsys.fr', {
          github: 'nicolachoquet06250',
          gitlab: ''
      }, 'nchoquet');//Content(response);
  }


  @Get('/hello/:name')
  helloWorld2(
      @Param("name") name: string
  ) {
      const response: GetHomeResponse = {
          Hello: name
      };

      return Content(response);
  }
}

@Area({
  controllers: [HomeController],
})
export class HomeArea {}
