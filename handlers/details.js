'use strict'
var url = require('url')
var fs = require('fs')

var todos = require('./index').db
var todoState = require('../helpers/todo-state')

var responsesHelper = require('../helpers/responses.js')

var mainPageHtml = './contents/html/index.html'
const detailsPageHtml = './contents/html/details.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details/')) {
    var urlSplit = req.pathname.split('/')
    var index = parseInt(urlSplit[urlSplit.length - 1])
    var itemPos = todos.map((x) => x.id).indexOf(index)
    var todo = todos[itemPos]

    var pageHeading = 'TODO Details'
    var pageContent = ''
    var code = 200
    var html = ''

    var mainPage = fs.readFileSync(mainPageHtml, 'utf8').split('#')
    var pageHeader = mainPage[0]
    var pageMenu = mainPage[1]
    var pageFooter = mainPage[2]

    if (todo) {
      var detailsPage = fs.readFileSync(detailsPageHtml, 'utf8').split('#')
      var pageTop = detailsPage[0]
      var afterName = detailsPage[1]
      var afterDesc = detailsPage[2]
      var afterState = detailsPage[3]
      var image = detailsPage[4]
      var pageBottomDone = detailsPage[5]
      var pageBottomPend = detailsPage[6]
      var pageCommentsHeading = detailsPage[7]
      var pageCommentsForm = detailsPage[8]

      pageContent += pageTop +
        todo.title + afterName +
        todo.description + afterDesc

      if (req.method === 'POST') {
        if (todo.state === todoState.Pending) {
          todo.state = todoState.Done
        } else {
          todo.state = todoState.Pending
        }
      }

      var isPending = todo.state === todoState.Pending
      isPending
        ? pageContent += todo.state + afterState + pageBottomDone
        : pageContent += todo.state + afterState + pageBottomPend

      if (todo.image !== '') {
        let imageTag = image.split('?')[0]
        let imageEnd = image.split('?')[1]

        pageContent += imageTag + todo.image + imageEnd
      }

      pageContent += pageCommentsHeading +
        todo.id +
        pageCommentsForm

      if (todo.comments.length > 0) {
        pageContent += '<h3>Comments</h3><ul>'
        todo.comments.forEach((comment) => {
          pageContent += `<li><span>${comment.text}</span></li>`
        })
        pageContent += '</ul>'
      }

      html = pageHeader +
        pageHeading +
        pageMenu +
        pageContent +
        pageFooter
    } else {
      pageContent = '<h2>No TODO with such id</h2>'
      code = 404

      html = pageHeader +
      pageHeading +
      pageMenu +
      pageContent +
      pageFooter
    }


    responsesHelper.plain(res, html, 'text/html', code)
  } else {
    return true // handler does not support request
  }
}
