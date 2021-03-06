'use strict'
var fs = require('fs')
var url = require('url')

var responsesHelper = require('../helpers/responses.js')

function getContentType (filepath) {
  var contentType

  if (filepath.endsWith('.css')) {
    contentType = 'text/css'
  } else if (filepath.endsWith('.js')) {
    contentType = 'application/javascript'
  } else if (filepath.endsWith('.html')) {
    contentType = 'text/html'
  } else if (filepath.endsWith('.jpg')) {
    contentType = 'image/jpg'
  }

  return contentType
}

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname
  var filepath = '.' + req.pathname

  fs.readFile(filepath, (err, data) => {
    if (err) {
      responsesHelper.notFound(res, '', '', err)
      return
    }

    var contentType = getContentType(filepath)

    if (!contentType) {
      console.error('Non-supported file format requested.')

      res.writeHead(415)
      res.write('415 UNSUPPORTED MEDIA TYPE')
      res.end()

      return true
    }

    responsesHelper.ok(res, data, contentType)
  })
}
