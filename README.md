# luvi ღ

--------

    $ cd /path/to/your/project
    $ luvi
    luvi listening on 4444

By default, `luvi` acts as a static server, serving the files in `cwd`.
On launch, `luvi` will open a tab in your default browser pointing to your defined root.

--------

## Installation & Usage

    $ npm i -g luvi
    $ luvi [server, ...] [options]

`luvi` looks inside `cwd` for a `.luvi.json` config file.
If there is no config file, the default static server is launched.

#### [server, ...]

    $ luvi foo bar
    foo listening on port 4444
    bar listening on port 8888

List of named servers to launch. Only names matching the ones in config file will be launched.

### [options]

Command-line arguments take priority over config files and defaults.
In a path with a `.luvi.json` file, running `luvi` will follow the options in the file,
unless any options are passed; if there are multiple servers in the `.luvi.json` file,
every server's options will be overridden. Project root is `cwd` by default.

    $ luvi                       # launches the default server
    $ luvi foo bar               # starts luvi servers `foo` & `bar`
    $ luvi -p 1337               # serves from specified port (must be root to use ports below 1024)
    $ luvi -r /path/to/www/root  # serves from the specified directory
    $ luvi -v                    # display's luvi's version
    $ luvi -h                    # shows a version of this help dialog

### .luvi.json

To configure a single server: `{"root":"public","port":9090}`.
The object will be passed directly to `luvi`.

For multiple servers, simply use an array of single-server configs.
Use the `name` option to keep track of servers in logs.

    [{
      "name": "drafts",
      "root": "src",
      "port": 1337
    },{
      "name": "testing",
      "root": "build"
    },{
      "name": "todo",
      "root": "doc",
      "port": 6565,
      "notFound": "/var/www/404.html"
    }]

--------

## API

You can pass an object to `luvi()` for custom settings; otherwise, these defaults are applied:

    var luvi = require('luvi')
    luvi({
        name : 'luvi'
      , root : process.cwd()
      , port : 4444
    })

This is exactly the same as just calling `luvi()`, with no config object.

These defaults are merged with whatever you pass, so if, for example,
you only pass in a custom server name, `luvi` will still run on port 4444
and use `cwd` as the root to serve.

Multiple servers can be launched from the same script, with different configs,
by calling `luvi()` again with different options.

#### options

* root
  * `root: '/path/to/document/root'`
  * _Str_ Path where your static files are placed. Server only allows access to files in this directory.
    Usually where you'd have `index.html`. Can be absolute or relative.
  * Default : `process.cwd()`
* port
  * `port: 3000`
  * _Int_ Port on which to listen. If specified port is busy, `luvi` will look for a free port.
  * Default : `4444`.
* name
  * `name: 'foo'`
  * _Str_ Server name. Useful for launching multiple servers, and for keeping track in logs.
  * Default : `luvi`.
* onListen
  * `onListen: function(name, port){console.log(name, 'is listening on', port)}`
  * _function(name,port)_ Called when `luvi` starts listening.
  * Default : `console.log()` (as above).
* notFound
  * `notFound`: `'/path/to/404.html'`
  * _Str_ Path to a custom 404 page.
  * Default : `undefined`.
