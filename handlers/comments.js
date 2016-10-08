'use strict'
var url = require('url')
var query = require('querystring')

var datesHelper = require('../helpers/dates')
var responsesHelper = require('../helpers/responses')

var todos = require('./index').db

module.exports = (req, res) => {
  req.pathname = req.pathname || url.parse(req.url).pathname

  if (req.pathname.startsWith('/details/') &&
      req.pathname.endsWith('/comments') &&
      req.method === 'POST') {
    var urlSplit = req.pathname.split('/')
    var index = parseInt(urlSplit[urlSplit.length - 2])
    var itemPos = todos.map((x) => x.id).indexOf(index)
    var todo = todos[itemPos]

    if (todo) {
      var body = ''

      req.on('data', (data) => { body += data })
      req.on('end', () => {
        var commentText = query.parse(body).comment

        if (commentText) {
          var today = datesHelper.getToday()
          var commentItem = {
            'text': commentText,
            'dateCreated': today
          }
          todo.comments.push(commentItem)

          res.writeHead(302, {
            'Location': '/details/' + index
          })
          res.end()

          console.log(todo)
        } else {

        }
      })
    }

    responsesHelper.redirected(
      res,
      String.empty,
      String.empty,
      `/details/${index}`
    )
  } else {
    return true // handler does not support request
  }
}
