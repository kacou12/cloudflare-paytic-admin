const jsonServer = require('json-server')

const jsonServerAuth = require('json-server-auth')
const setupAdminRoutes = require('./admin/adminRoute.cjs')
const axios = require('axios')
var jwt = require('jsonwebtoken')
// import * as jsonServer from 'json-server'
// import * as jsonServerAuth from 'json-server-auth'
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
// @ts-ignore
server.db = router.db

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Setup admin routes
setupAdminRoutes(server)

server.use(jsonServerAuth)

// Use default router
server.use(router)
server.listen(3000, () => {
  console.log('JSON Server is running')
})
