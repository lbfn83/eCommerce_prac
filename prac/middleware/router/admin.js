const express = require('express')
const app = express()
const router = express.Router()

// predicate the router with a check and bail out when needed
router.use((req, res, next) => {
  console.log("ddddddd  ", req.path)
  if (req.path !== '/') return next('router')
  next()
})

router.get('/user/:id', (req, res) => {
  res.send('hello, user!')
})

// use the router and 401 anything falling through
// app.use('/admin', router, (req, res) => {
//   res.sendStatus(401)
// })


module.exports = router