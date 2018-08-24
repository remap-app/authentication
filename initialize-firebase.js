const admin = require('firebase-admin')
const serviceAccount = require('./service-account-key.json') // eslint-disable-line

module.exports = () => {
  try { // check app initialized. this is for dev
    admin.app()
  } catch (e) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  }
}
