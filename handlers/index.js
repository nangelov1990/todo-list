'use strict'
var homePage = require('./home-page')
var createTodo = require('./create')
var allTodos = require('./list-all')
var todoDetails = require('./details')
var comments = require('./comments')
var staticFiles = require('./static-files')

module.exports = [
  homePage,
  createTodo,
  allTodos,
  comments,
  todoDetails,
  staticFiles
]
