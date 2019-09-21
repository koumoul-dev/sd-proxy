const express = require('express')
const config = require('config')
const cookieParser = require('cookie-parser')
const eventToPromise = require('event-to-promise')
const http = require('http')
const proxy = require('http-proxy-middleware')
const session = require('@koumoul/sd-express')({
  directoryUrl: config.directoryUrl,
  publicUrl: config.publicUrl
})

const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(session.loginCallback)
app.use(session.auth)

app.use((req, res, next) => {
  if (!req.user) {
    const redirect = `${config.publicUrl}${req.originalUrl}${req.originalUrl.includes('?') ? '&' : '?'}id_token=`
    return res.redirect(`${config.directoryUrl}/login?redirect=${encodeURIComponent(redirect)}`)
  }
  if (config.adminOnly && !req.user.isAdmin) return res.status(403).send('Super admin only')
  next()
})

app.use(proxy({ target: config.target }))

// Run app and return it in a promise
exports.start = async () => {
  server.listen(config.port)
  await eventToPromise(server, 'listening')
  console.log(`HTTP server listening on ${config.port}, available at ${config.publicUrl}`)
}

exports.stop = async () => {
  server.close()
  await eventToPromise(server, 'close')
}
