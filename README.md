# luvi ♡

Simple dev server with Markdown support, CLI, and API.

----

```shell
$ cd /path/to/your/project
$ luvi
♡ luvi listening on 4444
```

By default, `luvi` acts as a static server, serving the files in `cwd`.

## Changes

* 6.0.0:
  * Removed:
    * Port finder (undocumented)
    * Custom 404 page (has a default)
    * Custom onListen
    * JSON configs (use the JS API)
  * Added:
    * Using through the Node API now returns an http.server
  * Changed:
    * `open` defaults to false
    * Markdown support is always on
* 5.2.0: Switch back to MIT license
* 5.1.0: Add Markdown support
* 5.0.0: Remove support for Node 8
* 4.0.0: Switch to LGPL-3.0
* 3.2.0: Un-deprecate, and add `.htm` and `.xhtml` support.
* 3.0.0: Removed `lv` shorthand. Use a shell alias.
* 2.1.1: Deprecated `lv` shorthand. This will still work until it's removed in
  3.0.0. Please update any scripts using `lv` to use `luvi`.
* 2.0.0: Switched to MIT license.
* 0.8.6: `luvi` no longer has a proxying utility.
* 0.9.13: `src/util` is now `src/lib`.
* 0.9.19: `src/` is now project root (`src/lib` is now `/lib`)
* 0.9.20: `package.json` is fixed so `luvi` works as a module again. Sorry about that!
* 0.9.21: Please `npm rm -g luvi` and then `npm i -g luvi` to upgrade!

## Installation and Usage

```shell
$ npm i -g luvi
$ luvi [options]
```

If you'd rather not install globally, you can use `npx`:
`npx luvi [options]`.

### [options]

```
♡ luvi (a server)
------------------
usage:
    ♡ luvi           # launch server with default config
    ♡ luvi -p 1337   # listen on specified port
    ♡ luvi -r /path  # serve from specified dir
    ♡ luvi -o        # open the browser after start
    ♡ luvi -v        # luvi version
    ♡ luvi -h        # this help
--------------------
see the readme for flags and api
```

## API

You can pass an object to `luvi()` for custom settings; otherwise, these
defaults are applied:

```javascript
const luvi = require('luvi')

const l = luvi({
  name: 'luvi',
  root: process.cwd(),
  port: 4444
})

// returns an http.server, so you can call l.close() when you're done with it
```

This is exactly the same as just calling `luvi()`, with no config object.

These defaults are merged with whatever you pass, so if, for example, you only
pass in a custom server name, `luvi` will still run on port 4444 and use `cwd`
as the root to serve.

Multiple servers can be launched from the same script, with different configs,
by calling `luvi()` again with different options.

#### Options

* root: `string` (default: `process.cwd()`)
  * Path where your static files are placed. Server only allows access to files in this directory.
    Usually where you'd have `index.html`. Can be absolute or relative.
  * Example: `root: '/path/to/document/root'`
* port: `number` (default: `4444`)
  * Port on which to listen.
  * Example: `port: 3000`
* open: `bool` (default: `false`)
  * Open the browser on server start.
  * Example: `open: true`

## Contributing

Please do, if you'd like! Any issue reports/fixes are welcome. I am not
considering adding any features.

[LICENSE](./LICENSE.md)
