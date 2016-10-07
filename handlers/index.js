let homePage = require('./home-page')
let createTodo = require('./create')
let allTodos = require('./list-all')
let todoDetails = require('./details')
let staticFiles = require('./static-files')

module.exports = [
  homePage,
  createTodo,
  allTodos,
  todoDetails,
  staticFiles
]
