'use strict'
module.exports = {
  plain,
  notFound,
  ok
}

function notFound (res, data, type, err) {
  console.error(err)
  plain(404, res, data, type)
}

function ok (res, data, type) {
  plain(200, res, data, type)
}

function plain (res, data, type, code) {
  res.writeHead(code, {
    'Content-Length': data.length,
    'Content-Type': type,
    'Connection': 'keep-alive',
    'Accept': '*/*'
  })
  res.write(data)
  res.end()
}
