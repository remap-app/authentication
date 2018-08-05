const { send, json } = require('micro')
const { router, get, post } = require('microrouter')
const admin = require('firebase-admin')
const statuses = require('statuses')
const pick = require('lodash.pick')
const serviceAccount = require('./service-account-key.json') // eslint-disable-line

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
})

module.exports = router(
  get('*', (req, res) => send(res, 404, { error: statuses[404] })),
  post ('/', async (req, res) => {
    let idToken
    try {
      const body = await json(req)
      idToken = body.idToken
    } catch (e) {
      send(res, 400, { error: statuses[400] })
      return
    }

    if (!idToken) {
      send(res, 400, { error: statuses[400] })
      return
    }

    const decodedToken = await admin.auth().verifyIdToken(idToken)
      .catch(() => send(res, 401, { error: statuses[401] }))

    if (decodedToken) {
      const responseBody = pick(decodedToken, [
        'name',
        'picture',
        'auth_time',
        'email',
        'email_verified',
        'uid',
      ])
      send(res, 200, responseBody)
    }
  })
)
