'use strict'
let homePage = require('./home-page')
let createTodo = require('./create')
let allTodos = require('./list-all')
let todoDetails = require('./details')
let comments = require('./comments')
let staticFiles = require('./static-files')

module.exports = [
  homePage,
  createTodo,
  allTodos,
  comments,
  todoDetails,
  staticFiles
]
