let url = require('url')
let fs = require('fs')

let responsesHelper = require('../helpers/responses.js')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile('./contents/html/index.html', (err, data) => {
      if (err) {
        responsesHelper.notFound(err, res, ': Home page')
      }

      responsesHelper.ok(res, data, 'text/html')
    })
  } else {
    return true // handler does support request
  }
}
