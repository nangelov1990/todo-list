let url = require('url')
let fs = require('fs')


let todos = require('../contents/mock-db')
let todoState = require('../helpers/todo-state')

let responsesHelper = require('../helpers/responses.js')

const detailsPage = './contents/html/details.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details/')) {
    let urlSplit = req.pathname.split('/')
    let index = parseInt(urlSplit[urlSplit.length - 1])
    let itemPos = todos.map((x) => x.id).indexOf(index)
    let todo = todos[itemPos]

    if (!todo) {
      responsesHelper.notFound('non such TODO', res, ': TODO')
    }

    fs.readFile(detailsPage, 'utf8', (err, data) => {
      if (err) responsesHelper.notFound(err, res, ': Details page')

      let pageTop = data.split('#')[0]
      let afterName = data.split('#')[1]
      let afterDesc = data.split('#')[2]
      let pageBottomDone = data.split('#')[3]
      let pageBottomPend = data.split('#')[4]
      let html = pageTop +
        todo.title + afterName +
        todo.description + afterDesc

      if (req.method === 'POST') {
        if (todo.state === todoState.Pending) {
          todo.state = todoState.Done
        } else {
          todo.state = todoState.Pending
        }
      }

      let isPending = todo.state === todoState.Pending
      isPending
        ? html += todo.state + pageBottomDone
        : html += todo.state + pageBottomPend

      responsesHelper.ok(res, html, 'text/html')
    })
  } else {
    return true // handler does not support request
  }
}

// module.exports.changeState = () => {
//   if (todo.state = todoState.Done) {
//     todo.state = todoState.Pending

//     return
//   }

//   todo.state = todoState.Done
//   console.log(todo.state)
// }
