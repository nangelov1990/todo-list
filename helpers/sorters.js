'use strict'
module.exports = {
  'sortByStateThenByDate': sortByStateThenByDate,
  'compareDates': compareDates
}

function sortByStateThenByDate (todoA, todoB) {
  let x = todoA.state[0]
  let y = todoB.state[0]
  if (x === y) {
    return compareDates(todoA.dateCreated, todoB.dateCreated)
  }
  return x < y ? 1 : x > y ? -1 : 0
}

function compareDates (dateA, dateB) {
  let dayA = dateA.day
  let dayB = dateB.day
  let monthA = dateA.month
  let monthB = dateB.month
  let yearA = dateA.year
  let yearB = dateB.year
  if (yearA === yearB) {
    if (monthA === monthB) {
      return dayA < dayB ? -1 : dayA > dayB ? 1 : 0
    }
    return monthA < monthB ? -1 : monthA > monthB ? 1 : 0
  }
  return yearA < yearB ? -1 : yearA > yearB ? 1 : 0
}
