# My Deno Land

My learning area for [🦕 Deno](https://deno.com)

## To start

- Install Deno ([instructions](https://deno.com/manual@v1.34.0/getting_started/installation))
- Run it!
  ```
  deno run --allow-net --allow-env main.ts
  ```

## To edit

You need to have Deno enabled in your IDE.

- VSCode
  * Install Deno extension (find it on Marketplace)
  * Open Command Palette (`Cmd `(or `Ctrl`)` + Shift + P`)
  * Search for `Deno: Initialize workspace`
  * Press `Enter`
<!-- - Other IDE:
  * ???
  * PROFIT!!! -->

### Note about running script

Most of the time you will run scripts from the repo folder, so be aware that there is a need to be explicit in the folders most of the time.

For example, when generating new server:

`deno run --allow-write programs/new_server.ts examples/your_server.ts std 0`
