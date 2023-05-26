export function stdHandler(request: Request): Response {
    console.log("Handling request", request)
    return new Response('Hello, world!', {
        status: 200,
    })
}

export async function nativeHandler(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn)

    for await (const requestEvent of httpConn) {
        console.log(
            "Processing request event", requestEvent,
            "for connection", httpConn,
        )
        requestEvent.respondWith(
            new Response("hello world", {
                status: 200,
            })
        )
    }
}
