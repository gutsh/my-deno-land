const PROG_NAME = "New Server"
const PROG_VERSION = "0.0.1"
const LOG_STRING = PROG_NAME + ' ' + PROG_VERSION + ':'

// console.log(LOG_STRING, Deno.args)

function usage() {
    // console.error(
    //     LOG_STRING,
    //     "bad args",
    //     args,
    // )
    console.log(LOG_STRING, "Usage:",
`
deno run --allow-write programs/new_server.ts <file_name> <handler_type> <port_number>
where:
        file_name - file name of the server to be created (beware of folder paths!)
        handler_type - either native or std
        port_number - obvious

Example:
        deno run --allow-write programs/new_server.ts example.ts native 5000
`)
}

async function main(args = Deno.args) {
    if (args.length <= 1 || args.length > 3) {
        usage()
        Deno.exit(1)
    }

    const handlerType: 'native' | 'std' | string = args[1]
    const settings = {
        port: Number(args[2]),
    }
    const handlerImportName = `${handlerType}Handler`
    const type = handlerImportName === 'stdHandler' ? 'std' : 'native'

    const writeResult = await Deno.writeTextFile(args[0],
`${type == 'std' ? 'import { serve } from "../deps.ts"\n' : ''}import { ${handlerImportName} } from '../regular.ts'

const settings = {
    port: ${settings.port || 65000} /* will be a random thing */,
}

const mode_env = Deno.env.get('_MODE'),
mode = mode_env ? mode_env : 'http'

if (mode === 'http') {
    ${type == 'std' ?
'serve(stdHandler, settings)'
        : `
const server = Deno.listen(settings)
for await (const conn of server) {
    ${handlerImportName}(conn)
}
        `
    }
}
else {
    console.error("Mode is unsupported:", mode)
    Deno.exit(1)
}
`, {})

    console.log(writeResult)
}

await main()
