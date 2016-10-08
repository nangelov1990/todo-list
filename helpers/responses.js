'use strict'
module.exports = {
  ok,
  notFound,
  redirected,
  plain
}

function ok (res, data, type) {
  plain(res, data, type, 200)
}

function notFound (res, data, type, err) {
  console.error(err)
  plain(res, data, type, 404)
}

function redirected (res, data, type, relocationUrl) {
  data = ''
  type = 'text/html'
  plain(res, data, type, 302, relocationUrl)
}

function plain (res, data, type, code, locationHeaderUrl) {
  var headers = {
    'Content-Length': data.length,
    'Content-Type': type,
    'Connection': 'keep-alive',
    'Accept': '*/*'
  }
  locationHeaderUrl
    ? headers.Location = locationHeaderUrl
    : null

  res.writeHead(code, headers)
  res.write(data)
  res.end()
}
