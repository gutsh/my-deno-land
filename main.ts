import { serve } from "./deps.ts"

import { handler } from "./regular.ts"

const settings = {
    port: 8800,
}

const mode_env = Deno.env.get('_MODE'),
      mode = mode_env ? mode_env : 'http'

if (mode === 'http') {
    serve(handler, settings)

    // const server = Deno.listen(settings)
    // for await (const conn of server) {
    //     old_fashion_handler(conn)
    // }
}
else {
    console.error("Mode is unsupported:", mode)
    Deno.exit(1)
}
