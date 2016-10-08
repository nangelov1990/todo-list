'use strict'
var url = require('url')
var fs = require('fs')

var responseHelper = require('../helpers/responses')
var sortHelper = require('../helpers/sorters')

var todos = require('./index').db

var mainPageHtml = './contents/html/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/all' && req.method === 'GET') {
    var pageHeading = 'All TODOs'
    var pageContent = ''

    var mainPage = fs.readFileSync(mainPageHtml, 'utf8')
    var pageHeader = mainPage.split('#')[0]
    var pageMenu = mainPage.split('#')[1]
    var pageFooter = mainPage.split('#')[2]


    if (todos.length <= 0) {
      pageContent = `<h3>No TODOs yet.</h3>`
    }

    pageContent += '<ul>'
    todos.sort((todoA, todoB) => sortHelper.sortByStateThenByDate(todoA, todoB))
    todos.forEach((todo) => {
      pageContent += `<li><a href="/details/${todo.id}"><h3>${todo.title}</h3></a>
        <ul>
          <li><span>Descrition: ${todo.description}</span></li>
          <li><span>State: ${todo.state}</span></li>
        </ul>
      </li>`
    })
    pageContent += '</ul>'

    var html = pageHeader +
      pageHeading +
      pageMenu +
      pageContent +
      pageFooter

    responseHelper.ok(res, html, 'text/html')
  } else {
    return true // handler does not support request
  }
}
