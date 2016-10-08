'use strict'
var url = require('url')
var fs = require('fs')
var query = require('querystring')
var multiparty = require('multiparty')

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
      var title = ''
      var desc = ''
      var filename = ''
      var form = new multiparty.Form()

      form.parse(req)

      form.on('part', (part) => {
        if (part.filename) {
          var file = ''
          part.setEncoding('base64')
          part.on('data', (data) => { file += data })
          part.on('end', () => {
            fs.writeFile(`./images/${part.filename}`, file)
            filename = part.filename
          })
        } else {
          let body = ''
          part.setEncoding('utf8')
          part.on('data', (data) => {
            console.log(data)
            body += data
          })
          part.on('end', () => {
            if (part.name === 'title') {
              title = body
            } else {
              desc = body
            }
          })
        }
      })

      form.on('close', () => {
        var index = todos.length
        var today = datesHelper.getToday()

        var todoItem = {
          'id': index,
          'title': title,
          'description': desc,
          'state': todoState.Pending,
          'dateCreated': today,
          'image': filename,
          'comments': []
        }
        console.log(todoItem)

        todos.push(todoItem)
        pageContent = '<h2>TODO created</h2>'

        html = pageHeader +
        pageHeading +
        pageMenu +
        pageContent +
        pageFooter

        responsesHelper.ok(res, html, 'text/html')
        console.log(todoItem)
      })
    }
  } else {
    return true // handler does support request
  }
}
