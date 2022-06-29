/*
 * Fork of connect-markdown due to badly outdated version of marked
 * Copyright(c) 2013 fengmk2 <fengmk2@gmail.com>
 * MIT Licensed
 */

const path = require('path')
const fs = require('fs/promises')
const url = require('url')
const { marked } = require('marked')

const markdownMiddleware = (root) => {
  const layout = path.resolve(__dirname, 'markdown-layout.html')
  const titleHolder = '{TITLE}'
  const bodyHolder = '{BODY}'

  const getContent = async (filepath) => {
    const content = await fs.readFile(filepath, 'utf8')
    const title = content
      .slice(0, content.indexOf('\n'))
      .trim()
      .replace(/^[\s#]+/, '')

    const body = marked(content)

    const layoutContent = await fs.readFile(layout, 'utf8')

    const html = layoutContent
      .replace(titleHolder, title)
      .replace(bodyHolder, body)

    return html
  }

  return (req, res, next) => {
    // eslint-disable-next-line n/no-deprecated-api
    const urlinfo = url.parse(req.url)
    let pathname = urlinfo.pathname
    if (pathname === '/') {
      pathname = '/index'
    }

    pathname = path.join(root, pathname + '.md')

    getContent(pathname)
      .then((html) => {
        res.charset = res.charset || 'utf-8'
        res.setHeader('Content-Type', 'text/html')
        res.end(html)
      })
      .catch((err) => next(err.code === 'ENOENT' ? null : err))
  }
}

module.exports = markdownMiddleware
