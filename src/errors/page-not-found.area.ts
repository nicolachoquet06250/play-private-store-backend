//@ts-ignore erreur d'ide
import { Middleware, PreRequestMiddleware, HttpContext, RouteMetadata } from "https://deno.land/x/alosaur@v0.34.0/mod.ts";

interface RouteParamInterface {
    type: string,
    target: any,
    method: string,
    index: number,
    name: string
}

type ReducerType = {
    queryString: Record<string, string>, 
    uri: Record<string, string>
}

@Middleware(new RegExp('\/(.*)'))
export class PageNotFound implements PreRequestMiddleware {
    private routesRegex: Array<string> = [];

    constructor(
        private routes: Array<RouteMetadata>
    ) {
        if (this.routes !== undefined) {
            this.routesRegex = this.routes.map((r: RouteMetadata) => {
                let route = r.route;

                if (r.params.length > 0) {
                    //@ts-ignore bidon
                    const uri: ReducerType = r.params.reduce((r: ReducerType, c: RouteParamInterface): ReducerType => {
                        switch (c.type) {
                            case 'query': 
                                r.queryString[c.name] = '(.+)';
                                break;
                            
                            case 'route-param':
                                r.uri[c.name] = `(.+)`
                                break;
    
                            default: break;
                        }
    
                        return r;
                    }, { queryString: {}, uri: {} });
                    
                    route = Object.keys(uri.uri).reduce((r: string, c: string) => 
                        r.replace(new RegExp(':' + c), uri.uri[c]), route) + 
                        Object.keys(uri.queryString).map((c: string, i: number) => 
                            `${i === 0 ? '?' : '&'}${c}=${uri.queryString[c]}`)
                                .join('');
                }
    
                return route.replace(/\//g, '\/').replace(/\?/g, '\?').replace(/\=/g, '\=').replace(/\&/g, '\&');
            });

            console.log(
                'LISTE DES ROUTES => ', 
                this.routesRegex
            )
        }
    }
    
    //@ts-ignore erreur d'ide
    onPreRequest(context: HttpContext) {
        //const { request, respondWith } = context.request.serverRequest;

        /*if (this.routesRegex.length > 0) {
            const match = this.routesRegex.reduce((r: boolean, regexStr: string) => {
                if (r) return r;
                const str = request.url;

                const url = new URL(str);
                
                const domain = url.protocol + '\/\/' + url.host;

                console.log(domain, domain + regexStr + '$');

                const regex = new RegExp(domain + regexStr + '$').compile();
                let m: RegExpExecArray|null;
                let cmp = 0;

                if ((m = regex.exec(str)) !== null) {
                    // The result can be accessed through the `m`-variable.
                    m.forEach(() => {
                        //console.log(`Found match, group ${groupIndex}: ${match}`);
                        cmp++;
                    });
                }

                return cmp > 0;
            }, false);

            console.log('URL COURANTE =>', request.url);
            console.log('URL MATCH =>', match);

            if (!match) {
                return respondWith(
                    new Response(JSON.stringify({
                        status: 404,
                        message: 'La page que vous cherchez n\'existe pas'
                    }), { status: 404, headers: { ['Content-Type']: 'application/json' } }),
                );
            }
        }*/

        return context;
    }

    onPostRequest(context: HttpContext) {
        return context;
    }
}