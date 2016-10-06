let http = require('http')

let handlers = require('./handlers/index')

let port = process.env.PORT || 2993

http
  .createServer((req, res) => {
    for (let handler of handlers) {
      let next = handler(req, res)
      if (!next) {
        break
      }
    }
  })
  .listen(port)

console.log(`Server listening on port ${port}...`)
