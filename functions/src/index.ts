import * as functions from 'firebase-functions'
import express from 'express'

const app = express()

app.get('/test', (req: any, res:any) => {
  res.send('test')
})

exports.app = functions.https.onRequest(app)
