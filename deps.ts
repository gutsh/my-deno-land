export { serve } from "https://deno.land/std@0.189.0/http/server.ts"
import * as esbuildModule from 'https://deno.land/x/esbuild@v0.17.18/mod.js'

export const esbuild = esbuildModule

export async function testEsbuild() {
    const ts = 'let test: boolean = true',
          result = await esbuild.transform(ts, { loader: 'ts' })

    console.log('result:', result)

    esbuild.stop()
}

// await testEsbuild()
