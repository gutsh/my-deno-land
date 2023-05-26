import { serve } from "../deps.ts"
import { stdHandler } from '../regular.ts'

const settings = {
    port: 5000,
}

const mode_env = Deno.env.get('_MODE'),
mode = mode_env ? mode_env : 'http'

if (mode === 'http') {
    serve(stdHandler, settings)
}
else {
    console.error("Mode is unsupported:", mode)
    Deno.exit(1)
}
