'use strict'
let url = require('url')
let fs = require('fs')

let responseHelper = require('../helpers/responses')
let sortHelper = require('../helpers/sorters')

let todos = require('../contents/mock-db')

let mainPageHtml = './contents/html/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/all' && req.method === 'GET') {
    let pageHeading = 'All TODOs'
    let pageContent = ''

    let mainPage = fs.readFileSync(mainPageHtml, 'utf8')
    let pageHeader = mainPage.split('#')[0]
    let pageMenu = mainPage.split('#')[1]
    let pageFooter = mainPage.split('#')[2]


    if (!todos) {
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

    let html = pageHeader +
      pageHeading +
      pageMenu +
      pageContent +
      pageFooter

    responseHelper.ok(res, html, 'text/html')
  } else {
    return true // handler does not support request
  }
}
