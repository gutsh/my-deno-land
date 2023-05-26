// import { serve } from "./deps.ts"

import {
    // stdHandler,
    nativeHandler
} from "./regular.ts"

const settings = {
    port: 8800,
}

const mode_env = Deno.env.get('_MODE'),
      mode = mode_env ? mode_env : 'http'

if (mode === 'http') {
    // serve(stdHandler, settings)

    const server = Deno.listen(settings)
    for await (const conn of server) {
        nativeHandler(conn)
    }
}
else {
    console.error("Mode is unsupported:", mode)
    Deno.exit(1)
}
