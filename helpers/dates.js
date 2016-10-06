module.exports = [
  getToday
]

function getToday () {
  let today = new Date()
  let dd = today.getDate()
  let mm = today.getMonth() + 1  // January is 0!
  let yyyy = today.getFullYear()

  if (dd < 10) {
    dd = '0' + dd
  }

  if (mm < 10) {
    mm = '0' + mm
  }

  let date = {
    day: dd,
    month: mm,
    year: yyyy
  }

  return date
}
