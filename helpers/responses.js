module.exports = {
  notFound,
  ok
}

function notFound (err, res, adText) {
  console.error(err)

  res.writeHead(404)
  res.write('404 NOT FOUND' + adText)
  res.end()

  return
}

function ok (res, data, type) {
  res.writeHead(200, {
    'Content-Length': data.length,
    'Content-Type': type,
    'Connection': 'keep-alive',
    'Accept': '*/*'
  })
  res.write(data)
  res.end()
}
