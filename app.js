'use strict'
var http = require('http')

var handlers = require('./handlers/index')

var port = process.env.PORT || 2993

http
  .createServer((req, res) => {
    for (var handler of handlers) {
      var next = handler(req, res)
      if (!next) {
        break
      }
    }
  })
  .listen(port)

console.log(`Server listening on port ${port}...`)
