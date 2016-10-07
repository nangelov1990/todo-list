let url = require('url')
let fs = require('fs')
let query = require('querystring')

let responsesHelper = require('../helpers/responses')
let datesHelper = require('../helpers/dates')
let todoState = require('../helpers/todo-state')

let todos = require('../contents/mock-db')

let mainPageHtml = './contents/html/index.html'
let createPageHtml = './contents/html/create.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    let pageHeading = 'Create new TODO'
    let pageContent = ''

    let mainPage = fs.readFileSync(mainPageHtml, 'utf8')
    let pageHeader = mainPage.split('#')[0]
    let pageMenu = mainPage.split('#')[1]
    let pageFooter = mainPage.split('#')[2]

    let html = ''

    if (req.method === 'GET') {
      pageContent = fs.readFileSync(createPageHtml, 'utf8')

      html = pageHeader +
        pageHeading +
        pageMenu +
        pageContent +
        pageFooter

      responsesHelper.ok(res, html, 'text/html')
    } else if (req.method === 'POST') {
      var body = ''

      req.on('data', (data) => { body += data })
      req.on('end', () => {
        let todoParsed = query.parse(body)

        let emptyTitle = todoParsed.title === '' || undefined
        let emptyDesc = todoParsed.description === '' || undefined
        
        if (!(emptyTitle || emptyDesc)) {
          let index = todos.length
          let today = datesHelper.getToday()
          let todoItem = {
            'id': index,
            'title': todoParsed.title,
            'description': todoParsed.description,
            'state': todoState.Pending,
            'dateCreated': today,
            'comments': []
          }
          todos.push(todoItem)
          pageContent = '<h2>TODO created</h2>'
        } else {
          pageContent = '<h4>Empty Details. Try Again.</h4>'
        }

        html = pageHeader +
        pageHeading +
        pageMenu +
        pageContent +
        pageFooter

        responsesHelper.ok(res, html, 'text/html')
      })
    }
  } else {
    return true // handler does support request
  }
}
