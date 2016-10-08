'use strict'
var url = require('url')
var fs = require('fs')
var query = require('querystring')

var responsesHelper = require('../helpers/responses')
var datesHelper = require('../helpers/dates')
var todoState = require('../helpers/todo-state')

var todos = require('./index').db

var mainPageHtml = './contents/html/index.html'
var createPageHtml = './contents/html/create.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/create') {
    var pageHeading = 'Create new TODO'
    var pageContent = ''

    var mainPage = fs.readFileSync(mainPageHtml, 'utf8')
    var pageHeader = mainPage.split('#')[0]
    var pageMenu = mainPage.split('#')[1]
    var pageFooter = mainPage.split('#')[2]

    var html = ''

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
        var todoParsed = query.parse(body)

        var emptyTitle = todoParsed.title === '' || undefined
        var emptyDesc = todoParsed.description === '' || undefined

        if (!(emptyTitle || emptyDesc)) {
          var index = todos.length
          var today = datesHelper.getToday()
          var todoItem = {
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
