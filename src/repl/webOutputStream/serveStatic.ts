import * as Koa from 'koa';
import * as KoaStatic from 'koa-static';

export function serveStatic(): Koa<Koa.DefaultState, Koa.DefaultContext> {
    const staticFileServer = new Koa();
    staticFileServer.use(KoaStatic('src/repl/webOutputStream/staticAssets'));
    return staticFileServer;
}
