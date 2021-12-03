//@ts-ignore erreur d'ide
import { Area, Controller, Get } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

@Controller()
class CoreController {
  @Get()
  text() {
    return "Hello world";
  }
}

@Area({
  controllers: [CoreController],
})
export class CoreArea {}
