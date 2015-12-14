# luvi
### Front end development server
--------

Launch the server from the document root of your project (where the `index.html` is placed).

    $ cd /path/to/prj
    $ luvi
	  server listening on port 3000

By default, **luvi** acts as a static server, serving the files placed in the directory from where it is launched. It has, however, 3 main features built-in, covering the full development cycle:
  - **static server** for static demos
  - **fixtures server** for prototyping when the back end is not released yet
  - **proxy server** for redirecting requests to a back end

### Installation
    $ npm i -g luvi

### Usage
    $ luvi [server, ...] [options]
**luvi** looks inside the current directory looking for a `.luvi.json` config file. If there is no config file, the default static server is launched.

#### [server, ...]
    $ luvi dev doc
    dev listening on port 3000
    doc listening on port 3001
List of named servers to launch. Only names matching the ones in config file will be launched.

### [options]

    $ luvi --h
  Shows a shortened version of this README.

    $ luvi -v
  Displays luvi's version

    $ luvi -c /path/to/nondefault/config.json
  Use the specified file as server configuration instead of the default `.luvi.json`

    $ luvi -n
  Ignore the `.luvi.json` config file in the current directory. Useful when used with the server-related options like `-r`.

### [server-related options]
The following options will be passed through directly to the **luvi** library. For further information see the API documentation below.
The command-line options get priority over the config file options. In a path with a `.luvi.json` file, running `luvi` with server-related options overrides the ones specified in the config file. If the config file has multiple servers, the command-line options will override every server definition.

    $ luvi -r /path/to/document/root
  Path where the files you want to serve are stored.
  The root is defined following this priority order:
1.  CLI parameter
2.  config's root property
3.  current directory

    $ luvi -p 1337
  Port to listen for incoming requests.
  To serve on ports below 1024, you will need to launch as root.

### .luvi.json
**Single server configuration**. To configure a single server you can declare server-related options directly as a JSON object: `{"root": "public",  "port": 8080}`.
The object will be passed through directly to the **luvi** library. For a list of the options that can be used see the API documentation below.
_(Note that because functions cannot be used in JSON, some options from
the API are only accessible through JavaScript.)_

**Multiple server configuration**. To configure multiple servers simply use an array of single configurations. Its recommended to use the `name` option to recognize the servers in the common log.
```json
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
```

## API

You can pass a config object to the `luvi()` function to define custom settings. Otherwise defaults will be applied. Here is an example using the same config as the default settings.
```javascript
var luvi = require('luvi')
luvi({
    name: 'server'
  , root: process.cwd()
  , port: 3000
})
```
This is the same as calling `luvi()` with no config object. The defaults are merged with the config passed so you can configure just the name, for instance, and the default port and root will be applied.
You can launch multiple servers from the same script, each with its own configuration, by calling `luvi()` several times passing the settings you want on each call.
There are 3 available middlewares built-in, which handle requests with the following priority:

1.   proxy middleware
2.   fixtures middleware
3.   static middleware

If there is a `proxy` property defined and a request context matches one of the contexts specified, the request is handled by the proxy middleware without being passed on.
If there is a `fixtures` property defined and a request context matches one of the contexts specified (and the request has not been handled by the proxy middleware), the request is handled by the fixtures middleware without being passed on.
If the request has not been handled by the previous middlewares it is handled by the static middleware by default. If the static middleware cannot handle the request, an error HTTP response is returned.

#### config.root
`root: '/path/to/document/root'`
**(String)** Path where the static files are placed. The server will only allow access to files inside this directory. Usually this is the directory where `index.html` is placed.
The path can be absolute or relative to the current directory. **(Defaults to)** `process.cwd()` _(the current directory)_.

#### config.port
`port: 3000`
**(Number)** Port to listen for incoming requests. **luvi** looks for a free port to listen. If the specified port is busy, the port number is incremented and tried again until a free port is reached. **(Defaults to)** `3000`.

#### config.name
`name: 'foo'`
**(String)** Name of the server to be used in logs. This is useful when launching several servers from the same script to recognize which logs are emitted from which server. **(Defaults to)** `'server'`

#### config.fixtures
`fixtures: {'/api': '/path/to/fixtures'}`
**({context: path})** A map of request contexts to paths with JSON fixtures. The path can be absolute or relative to the current directory. Multiple mappings can be defined here.
This middleware reply to every request that matches the specified context regardless of the HTTP method used (`GET`, `POST`, ...). The request is modified adding a `.json` at the end.

*   Having a `/path/to/fixtures/endpoint.json` fixture
*   Having a `fixtures: { '/api': '/path/to/fixtures' }` configuration
*   All requests to `/api/endpoint` would be replied with the contents of
    `endpoint.json`

**(Defatults to)** `undefined`. **NOTE:** fixtures are rendered using [dummy-json](https://github.com/webroo/dummy-json) which allows to generate random data from a handlebars extended JSON file.

**URL params** Currently there is no support for defining URLs with params (`/api/item/:id/data`). For this kind of requests we have to use directories representing the variable part (`:id`).

    /path/to/fixtures/item/10/data.json
    /path/to/fixtures/item/20/data.json

Then use the defined ids (`10`, `20`, ...) in your fixtures so future requests can be matched against the fake directory structure.

```json
[
  {
    "id": 10,
    "name": "foo"
  },
  {
    "id": 20,
    "name": "bar"
  }
]
```

#### config.proxy
`proxy: {'/api': 'http://backend:8080/prj'}`
**({context: url})** A map of request contexts to backend urls.

*   Having a backend for the project hosted at `http://backend` listening
    to port `8080`
*   Having a proxy configuration like in the sample above
    (`'/api': 'http://backend:8080/prj'`)
*   All requests to `/api/endpoint` would be redirected to
    `http://backend:8080/prj/api/endpoint`
*   Support both `HTTP` and `HTTPS` protocols

Multiple mappings can be defined here. **(Defatults to)** `undefined`.

#### config.onListen
`onListen: function (serverName, port) {console.log(serverName, 'listening on port', port)}`
**(function (serverName, port))** Called once the server starts listening. **(Defaults to)** `console.log` _(like in the sample above)_.

