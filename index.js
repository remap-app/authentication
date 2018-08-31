require('dotenv').config()

const { STATUS_CODES } = require('http')
const { send, json } = require('micro')
const { router, post } = require('microrouter')
const cors = require('micro-cors-multiple-allow-origin')
const admin = require('firebase-admin')
const pick = require('lodash.pick')
const initialize = require('./initialize-firebase')

initialize()

module.exports = cors({
  allowMethods: ['POST', 'OPTIONS'],
  origin: process.env.CORS_ALLOWED_ORIGINS.split(','),
})(
  router(
    post ('/', async (req, res) => {
      let idToken
      try {
        const body = await json(req)
        idToken = body.id_token
      } catch (e) {
        send(res, 400, { error: STATUS_CODES[400] })
        return
      }
  
      if (!idToken) {
        send(res, 400, { error: STATUS_CODES[400] })
        return
      }
  
      const decodedToken = await admin.auth().verifyIdToken(idToken)
        .catch(() => {
          send(res, 401, { error: STATUS_CODES[401] })
        })
  
      if (!decodedToken) {
        send(res, 401, { error: STATUS_CODES[401] })
        return
      }

      const responseBody = pick(decodedToken, [
        'name',
        'picture',
        'auth_time',
        'email',
        'email_verified',
        'uid',
      ])

      return responseBody
    })
  )
)
