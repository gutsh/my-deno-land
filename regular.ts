export function handler(request: Request): Response {
    console.log("Handling request", request)
    return new Response('Hello, world!', {
        status: 200,
    })
}

export async function old_fashion_handler(conn: Deno.Conn) {
    const httpConn = Deno.serveHttp(conn)

    for await (const requestEvent of httpConn) {
        await requestEvent.respondWith(
            new Response("hello world", {
                status: 200,
            })
        )
    }
}
