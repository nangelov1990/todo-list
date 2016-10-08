'use strict'
module.exports = {
  plain,
  notFound,
  ok
}

function notFound (res, data, type, err) {
  console.error(err)
  plain(res, data, type, 404)
}

function ok (res, data, type) {
  plain(res, data, type, 200)
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
