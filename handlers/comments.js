let url = require('url')
let query = require('querystring')

let todos = require('../contents/mock-db')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details/') &&
      req.pathname.endsWith('/comments') &&
      req.method === 'POST') {
    let urlSplit = req.pathname.split('/')
    let index = parseInt(urlSplit[urlSplit.length - 2])
    let itemPos = todos.map((x) => x.id).indexOf(index)
    let todo = todos[itemPos]

    if (todo) {
      let body = ''

      req.on('data', (data) => { body += data })
      req.on('end', () => {
        let comment = query.parse(body).comment

        if (comment) {
          todo.comments.push(comment)

          res.writeHead(302, {
            'Location': '/details/' + index
          })
          res.end()

          console.log(todo)
        }
      })
    }
  } else {
    return true // handler does not support request
  }
}
