let url = require('url')
let fs = require('fs')
let query = require('querystring')

let responsesHelper = require('../helpers/responses')
let datesHelper = require('../helpers/dates')
let todoState = require('../helpers/todo-state')

let db = require('../contents/mock-db')

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    if (req.method === 'GET') {
      fs.readFile('./contents/html/create.html', (err, data) => {
        if (err) {
          responsesHelper.notFound(err, res, ': TODO create page')
        }

        responsesHelper.ok(res, data, 'text/html')
      })
    } else if (req.method === 'POST') {
      var body = ''

      req.on('data', (data) => { body += data })
      req.on('end', () => {
        let today = datesHelper.getToday()
        let todoParsed = query.parse(body)
        let index = db.length
        let todoItem = {
          'id': index,
          'title': todoParsed.title,
          'description': todoParsed.description,
          'state': todoState.Pending,
          'dateCreated': today
        }
        db.push(todoItem)

        let todoCreatedHtml = '<a href="/">Home</a><br /><h2>TODO created</h2>'
        responsesHelper.ok(res, todoCreatedHtml, 'text/html')
      })
    }
  } else {
    return true // handler does support request
  }
}
