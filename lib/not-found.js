const notFound = () => {
  return (_, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' })
    res.write('404')
  }
}

module.exports = notFound
