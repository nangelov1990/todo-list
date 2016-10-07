'use strivt'
var fs = require('fs')
var url = require('url')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/favicon.ico') {
    fs.readFile('./content/favicon.ico', (err, data) => {
      if (err) {
        console.error(err)

        res.writeHead(404)
        res.write('404 NOT FOUND')
        res.end()

        return
      }

      res.writeHead(200)
      res.write(data)
      res.end()
    })
  } else {
    return true // module does not support request
  }
}
