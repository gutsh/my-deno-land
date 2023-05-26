function check_reader(reader: unknown) {
    if (!reader) {
        throw "reader lost"
    }
}

async function _readData(url: string) {
    const response = await fetch(url);
    const reader = response.body?.getReader();

    check_reader(reader)
    
    while (true) {
        const { done } = await reader!.read();
        if (done) {
        // Do something with last chunk of data then exit reader
        return;
        }
        // Otherwise do something here to process current chunk
    }
}

async function _aiter_readData(url: string) {
    const response = await fetch(url);

    check_reader(response.body)

    for await (const _chunk of response.body!) {
       // Do something with each "chunk"
    }
    // Exit when done
}

export default function streamingHandler(_req: Request): Response {
    let timer: number | undefined

    const body = new ReadableStream({
        start(controller) {
            timer = setInterval(() => {
                controller.enqueue(new TextEncoder().encode(
                    'Hello, streaming world!'
                ));
            }, 1000)
        },
        cancel() {
            if (timer !== undefined) {
                clearInterval(timer)
            }
        }
    })

    return new Response(body, {
        headers: {
            "content-type": "text/plain",
            "x-content-type-options": "nosniff",
        }
    })
}
