const help = `
♥ luvi (a server)
------------------
usage:
    ♥ luvi           # launch default server
    ♥ luvi foo bar   # start servers 'foo' & 'bar'
    ♥ luvi -p 1337   # listen on specified port
    ♥ luvi -r /path  # serve from specified dir
    ♥ luvi -n        # doesn't open the browser after start
    ♥ luvi -v        # luvi version
    ♥ luvi -h        # this help
                             --------------------
see the readme for config options and api usage
`

module.exports = help
