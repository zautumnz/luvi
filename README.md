# luvi ♡

Dev server with simple config and API.

[![Support with PayPal](https://img.shields.io/badge/paypal-donate-yellow.png)](https://paypal.me/zacanger) [![Patreon](https://img.shields.io/badge/patreon-donate-yellow.svg)](https://www.patreon.com/zacanger) [![ko-fi](https://img.shields.io/badge/donate-KoFi-yellow.svg)](https://ko-fi.com/U7U2110VB)

----

```shell
$ cd /path/to/your/project
$ luvi
luvi listening on 4444
```

By default, `luvi` acts as a static server, serving the files in `cwd`.
On launch, `luvi` will open a tab in your default browser pointing to your
defined root (you can pass a `-n` flag to disable this).

Originally forked from [freddie](http://npm.im/freddie).

## Changes

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
$ luvi [server, ...] [options]
```

`luvi` looks inside `cwd` for a `.luvi.json` config file.
If there is no config file, the default static server is launched.

If you'd rather not install globally, you can use `npx`:
`npx luvi [server, ...] [options]`.

#### [server, ...]

```shell
$ luvi foo bar
foo listening on port 4444
bar listening on port 8888
```

List of named servers to launch. Only names matching the ones in config file
will be launched.

### [options]

Command-line arguments take priority over config files and defaults.

In a path with a `.luvi.json` file, running `luvi` will follow the options in
the file, unless any options are passed; if there are multiple servers in the
`.luvi.json` file, every server's options will be overridden. Project root is
`cwd` by default.

```
♡ luvi (a server)
------------------
usage:
    ♡ luvi           # launch default server
    ♡ luvi foo bar   # start servers 'foo' & 'bar'
    ♡ luvi -p 1337   # listen on specified port
    ♡ luvi -r /path  # serve from specified dir
    ♡ luvi -n        # don't open the browser after start
    ♡ luvi -m        # auto-render markdown files
    ♡ luvi -v        # luvi version
    ♡ luvi -h        # this help
                             --------------------
see the readme for config options and api usage
```

### .luvi.json

To configure a single server: `{ "root": "public", "port": 9090 }`.
The object will be passed directly to `luvi`.

For multiple servers, simply use an array of single-server configs.
Use the `name` option to keep track of servers in logs.

```json
[
  {
    "name": "drafts",
    "root": "src",
    "port": 1337
  },
  {
    "name": "testing",
    "root": "build",
    "noOpen": true,
    "markdown": true
  },
  {
    "name": "todo",
    "root": "doc",
    "port": 6565,
    "notFound": "/var/www/404.html"
  }
]
```

## API

You can pass an object to `luvi()` for custom settings; otherwise, these
defaults are applied:

```javascript
const luvi = require('luvi')

luvi({
  name: 'luvi',
  root: process.cwd(),
  port: 4444
})
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
  * Port on which to listen. If specified port is busy, `luvi` will look for a free port.
  * Example: `port: 3000`
* name: `string` (default: `luvi`)
  * Server name. Useful for launching multiple servers, and for keeping track in logs.
  * Example: `name: 'foo'`
* markdown: `bool` (default: `false`)
  * Auto-render markdown files without extension.
  * Example: `markdown: true`

* onListen: `(name: string, port: number): void` (Default: `console.log ; open`)
  * Called when `luvi` starts listening.
  * Example: `onListen: (name, port) => { console.log(name, 'is listening on', port) }`
* notFound: `string` (default: `undefined`)
  * Path to a custom 404 page.
  * Example: `notFound: '/path/to/404.html'`
* noOpen: `bool` (default: `undefined`)
  * Will not open the browser on server start.
  * Example: `noOpen: true`

## Contributing

Please do, if you'd like! Any issue reports/fixes are welcome. I am not
considering adding any features.

[LICENSE](./LICENSE.md)
