'use strict'
var db = require('../contents/mock-db')
module.exports.db = db

var homePage = require('./home-page')
var createTodo = require('./create')
var allTodos = require('./list-all')
var todoDetails = require('./details')
var comments = require('./comments')
var staticFiles = require('./static-files')

module.exports.handlers = [
  homePage,
  createTodo,
  allTodos,
  comments,
  todoDetails,
  staticFiles
]

