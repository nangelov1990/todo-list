let url = require('url')
let fs = require('fs')

let responseHelper = require('../helpers/responses')
let sortHelper = require('../helpers/sorters')

let todos = require('../contents/mock-db')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/all' && req.method === 'GET') {
    fs.readFile('./contents/html/all-items.html', 'utf8', (err, data) => {
      if (err) {
        responseHelper.notFound(err, res, ': All TODOs page')
      }

      let pageTop = data.split('#')[0]
      let pageBottom = data.split('#')[1]
      let html

      if (!todos) {
        var errorMessage = `<h3>No TODOs yet.</h3>`
        html = pageTop + errorMessage + pageBottom

        responseHelper.ok(res, html, 'text/html')
      }

      let todoList = ''
      todos.sort((todoA, todoB) => sortHelper.sortByStateThenByDate(todoA, todoB))
      todos.forEach((todo) => {
        todoList += `<li><a href="/details/${todo.id}"><h3>${todo.title}</h3></a>
        <span>Descrition: ${todo.description}</span>
        <span>State: ${todo.state}</span></li>`
      })

      html = pageTop +
        todoList +
        pageBottom

      responseHelper.ok(res, html, 'text/html')
    })
  } else {
    return true // handler does not support request
  }
}
