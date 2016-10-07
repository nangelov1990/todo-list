let url = require('url')
let fs = require('fs')

let responsesHelper = require('../helpers/responses.js')

const homePage = './contents/html/index.html'

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname === '/' && req.method === 'GET') {
    fs.readFile(homePage, 'utf8', (err, data) => {
      if (err) responsesHelper.notFound(err, res, ': Home page')

      let pageHeading = 'TODO List Home'

      let pageHeader = data.split('#')[0]
      let pageMenu = data.split('#')[1]
      let pageFooter = data.split('#')[2]

      let html = pageHeader +
        pageHeading +
        pageMenu +
        pageFooter

      responsesHelper.ok(res, html, 'text/html')
    })
  } else {
    return true // handler does support request
  }
}
