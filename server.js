const express = require('express')

const app = express()

//  Cache Middleware
const cache = require('./middlewares/v1/cache/cache')
const resetCache = require('./middlewares/v1/cache/resetCache')

app.get('/users/1', cache(10), (req, res, next) => {
  res.status(200).json({
    success: true,
    data: {
      users: [
        {
          id: 1,
          firstname: 'Olamide',
          lastname: 'Obaseki',
        },
        {
          id: 2,
          firstname: 'Olamide',
          lastname: 'Obaseki',
        },
        {
          id: 3,
          firstname: 'Olamide',
          lastname: 'Obaseki',
        },
      ],
    },
  })
})

app.post('/users/1', resetCache, (req, res, next) => {
  res.status(200).json({
    success: true,
    message: 'You have added it successfully',
  })
})

const server = app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(process.exit(0))
})
