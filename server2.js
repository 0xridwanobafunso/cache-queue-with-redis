const express = require('express')
const { userCreated } = require('./queuesProcessor')

/*
 **********************
 **  Queue Processor **
 **********************
 */
userCreated.queue.process(userCreated.job)

/*
 **********************
 **  Queue Listener  **
 **********************
 */
userCreated.event()

/*
 ******************
 **    Routes    **
 ******************
 */
const users = require('./routes/v1/users')

// Initialize express
const app = express()

// Mount Routes
app.use('/api/v1/users', users)

// Create Server to listen on port 1000
const server = app.listen(1000, console.log('App listening on port 3000!'))

// Unhandled Promise Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(process.exit(0))
})
