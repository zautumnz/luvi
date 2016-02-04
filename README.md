# luvi

## Front-end Development Server

--------

    $ cd /path/to/your/project
    $ luvi
    luvi listening on 4444

By default, `luvi` acts as a static server, serving the files in `cwd`. It can also redirect requests to a back-end.

### Installation & Usage

    $ npm i -g luvi
    $ luvi [server, ...] [options]

`luvi` looks inside `cwd` for a `.luvi.json` config file. If there is no config file, the default static server is launched.

##### [server, ...]

    $ luvi foo bar
    foo listening on port 4444
    bar listening on port 8888

List of named servers to launch. Only names matching the ones in config file will be launched.

### [options]

Command-line arguments take priority over config files and defaults. In a path with a `.luvi.json` file, running `luvi` will follow the options in the file, unless any options are passed; if there are multiple servers in the `.luvi.json` file, every server's options will be overridden. Project root is `cwd` by default.

    $ luvi -h                            # Shows a shortened version of this README
    $ luvi -v                            # Displays luvi's version
    $ luvi -c /path/to/some/config.json  # Use a non-default config file
    $ luvi -n                            # Ignore the config file in`cwd`--useful for `-r`
    $ luvi -r /path/to/your/project      # Serve from a different directory
    $ luvi -p 1337                       # Serve from specified port--for ports below 1024, run `luvi` as root

### .luvi.json

To configure a single server: `{"root":"public","port":9090}`. The object will be passed directly to `luvi`.

For multiple servers, simply use an array of single-server configs. Use the `name` option to keep track of servers in logs.

    [
      {
        "name": "dev",
        "root": "main",
        "port": 1337,
        "fixtures": {
          "/api": "test/fixtures"
        }
      },{
        "name": "staging",
        "root": "pub",
        "port": 4444,
        "proxy": {
          "/api": "http://backend:1207/app"
        }
      },{
        "name": "doc",
        "root": "doc",
        "port": 5000
      }
    ]

### API

You can pass an object to `luvi()` for custom settings; otherwise, these defaults are applied:

    var luvi = require('luvi')
    luvi({
        name: 'luvi'
      , root: process.cwd()
      , port: 4444
    })

This is exactly the same as just calling `luvi()`, with no config object.

These defaults are merged with whatever you pass, so if, for example, you only pass in a custom server name, `luvi` will still run on port 4444 and use `cwd` as the root to serve.

Multiple servers can be launched from the same script, with different configs, by calling `luvi()` again with different options.

If you define a `proxy` property and a request matches one of the specified contexts, that request will be handled by the proxy middleware.

If the proxy middleware doesn't handle the request, it'll be passed on to the static middleware. If the static middleware can't handle the request, it will return an HTTP error response.

#### options

* root
  * `root: '/path/to/document/root'`
  * _Str_ Path where your static files are placed. Server only allows access to files in this directory. Usually where you'd have `index.html`. Can be absolute or relative. Defaults to `process.cwd()`.
* port
  * `port: 3000`
  * _Int_ Port on which to listen. If specified port is busy, `luvi` will look for a free port--increments number until free port is found. Defaults to `4444`.
* name
  * `name: 'foo'`
  * _Str_ Server name. Useful for launching multiple servers, and for keeping track in logs. Defaults to `luvi`.
* proxy
  * `proxy: {'/api': 'http://back-end:9090/api;}`
  * _({context:url})_ Map of request contexts to back-end URLs. Supports HTTP and HTTPS. Multiple mappings can be defined here. Defaults to `undefined`.
* onListen
  * `onListen: function(name, port){console.log(name, 'is listening on', port)}`
  * _function(name,port)_ Called when `luvi` starts listening. Defaults to a `console.log()` as in the above example.

