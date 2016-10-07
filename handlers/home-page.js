'use strict'
var url = require('url')
var fs = require('fs')

var responsesHelper = require('../helpers/responses.js')

const homePage = './contents/html/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile(homePage, 'utf8', (err, data) => {
      if (err) responsesHelper.notFound(err, res, ': Home page')

      var pageHeading = 'TODO List Home'

      var pageHeader = data.split('#')[0]
      var pageMenu = data.split('#')[1]
      var pageFooter = data.split('#')[2]

      var pageContent = '<h1>Welcome to TODO List Web App</h1>'

      var html = pageHeader +
        pageHeading +
        pageMenu +
        pageContent +
        pageFooter

      responsesHelper.ok(res, html, 'text/html')
    })
  } else {
    return true // handler does support request
  }
}
