'use strict'
let url = require('url')
let fs = require('fs')

let todos = require('../contents/mock-db')
let todoState = require('../helpers/todo-state')

let responsesHelper = require('../helpers/responses.js')

let mainPageHtml = './contents/html/index.html'
const detailsPageHtml = './contents/html/details.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details/')) {
    let urlSplit = req.pathname.split('/')
    let index = parseInt(urlSplit[urlSplit.length - 1])
    let itemPos = todos.map((x) => x.id).indexOf(index)
    let todo = todos[itemPos]

    let pageHeading = 'TODO Details'
    let pageContent = ''
    let code = 200
    let html = ''

    let mainPage = fs.readFileSync(mainPageHtml, 'utf8').split('#')
    let pageHeader = mainPage[0]
    let pageMenu = mainPage[1]
    let pageFooter = mainPage[2]

    if (todo) {
      let detailsPage = fs.readFileSync(detailsPageHtml, 'utf8').split('#')
      let pageTop = detailsPage[0]
      let afterName = detailsPage[1]
      let afterDesc = detailsPage[2]
      let pageBottomDone = detailsPage[3]
      let pageBottomPend = detailsPage[4]
      let pageCommentsHeading = detailsPage[5]
      let pageCommentsForm = detailsPage[6]

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

      let isPending = todo.state === todoState.Pending
      isPending
        ? pageContent += todo.state + pageBottomDone
        : pageContent += todo.state + pageBottomPend

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


    responsesHelper.plain(code, res, html, 'text/html')
  } else {
    return true // handler does not support request
  }
}
