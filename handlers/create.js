let url = require('url')
let fs = require('fs')
let query = require('querystring')

let responsesHelper = require('../helpers/responses')
let datesHelper = require('../helpers/dates')
let todoState = require('../helpers/todo-state')

let db = require('../contents/mock-db')

let mainP = './contents/html/index.html'
let createPage = './contents/html/create.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    let pageHeading = 'Create new TODO'
    let pageContent = ''
    let html = ''

    let mainPage = fs.readFileSync(mainP, 'utf8')
    let pageHeader = mainPage.split('#')[0]
    let pageMenu = mainPage.split('#')[1]
    let pageFooter = mainPage.split('#')[2]

    if (req.method === 'GET') {
      pageContent = fs.readFileSync(createPage, 'utf8')
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
      })

      pageContent = '<h2>TODO created</h2>'
    }

    html = pageHeader +
      pageHeading +
      pageMenu +
      pageContent +
      pageFooter

    responsesHelper.ok(res, html, 'text/html')
  } else {
    return true // handler does support request
  }
}
