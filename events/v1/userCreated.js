const userCreatedQueue = require('../../queues/v1/userCreated')

const event = () => {
  return userCreatedQueue
    .on('active', (job, jobPromise) => {
      console.log(`Job ${job.id} started!!!!`)
    })
    .on('progress', (job, progress) => {
      console.log(`Job ${job.id} is ${progress * 100}% ready!`)
    })
    .on('completed', (job, result) => {
      console.log(`Job ${job.id} - Result: ${result} completed!!!`)
    })
    .on('failed', function (job, err) {
      console.log(`Job ${job.id} failed!!!!`)
    })
    .on('removed', function (job) {
      console.log(`Job ${job.id} removed!!!!`)
    })
}

module.exports = event
