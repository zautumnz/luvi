var cookie  = require('cookie')
, parse     = cookie.parse
, serialize = cookie.serialize

var cookieRewrite = function (cookie, fn){
  var tokens = cookie.split(/; */)
    , pair   = parse(tokens.shift())
    , name   = Object.keys(pair)[0]
    , value  = pair[name]
    , attrs  = parse(tokens.join('; '))

  var attrsMap = {
      name: name
    , value: value
  }

  attrs['Max-Age']  = attrs['Max-Age'] || attrs['max-age']
  attrs['Expires']  = attrs['Expires'] || attrs['expires']
  attrs['Path']     = attrs['Path'] || attrs['path']
  attrs['Domain']   = attrs['Domain'] || attrs['domain']
  attrs['Secure']   = attrs['Secure'] || attrs['secure']
  attrs['HttpOnly'] = attrs['HttpOnly'] || attrs['httponly']

  if(attrs['Max-Age']){attrsMap.maxage    = attrs['Max-Age']}
  if(attrs['Expires']){attrsMap.expires   = new Date(attrs['Expires'])}
  if(attrs['Path']){attrsMap.path         = attrs['Path']}
  if(attrs['Domain']){attrsMap.domain     = attrs['Domain']}
  if(attrs['Secure']){attrsMap.secure     = attrs['Secure']}
  if(attrs['HttpOnly']){attrsMap.httpOnly = attrs['HttpOnly']}

  var parsedCookie = fn(attrsMap)
  return serialize(parsedCookie.name, parsedCookie.value, parsedCookie)
}

module.exports = cookieRewrite

