const express = require('express')
const Queue = require('bull')
const cluster = require('cluster')

const app = express()
// You can treat add as send and process as receive

var numWorkers = 8
const myQueue = new Queue('User Created', {
  redis: {
    port: 17464,
    host: 'redis-17464.c8.us-east-1-2.ec2.cloud.redislabs.com',
    password: 'PhfQAfiNa9kPbyFTfbNZZeH3a1B24ymB',
  },
})

if (cluster.isMaster) {
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork()
  }

  cluster.on('online', function (worker) {
    // Lets create a few jobs for the queue workers
    for (var i = 0; i < 20; i++) {
      myQueue.add({ email: 'obafunsoadebayo@gmail.com' })
    }
  })

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died')
  })
} else {
  myQueue.process(function (job, jobDone) {
    console.log('Job done by worker', cluster.worker.id, job.id)
    jobDone()
  })
}

// myQueue.add(
//   { email: 'obafunsoadebayo@gmail.com' }
//   //   {
//   //     delay: 60000, // 1 min in ms
//   //     attempts: 2,
//   //   }
// )

myQueue.process((job) => {
  // Handle Heavy Task Here!!!!!!!!
  // Simply return a promise

  return Promise.resolve(`Email sent successfully to ${job.data.email}`)

  //   setTimeout(() => {
  //     return Promise.resolve(`Email sent successfully to ${job.data.email}`)
  //   }, 14000)

  //   // Handles promise rejection
  //   return Promise.reject(new Error('error transcoding'))

  //   // Passes the value the promise is resolved with to the "completed" event
  //   return Promise.resolve({ framerate: 29.5 /* etc... */ })

  //   // If the job throws an unhandled exception it is also handled correctly
  //   throw new Error('some unexpected error')
  //   // same as
  //   return Promise.reject(new Error('some unexpected error'))
})

myQueue
  .on('active', (job, jobPromise) => {
    console.log(`Job ${job.queue.name} started!!!!`)
  })
  .on('progress', (job, progress) => {
    console.log(`Job ${job.id} is ${progress * 100}% ready!`)
  })
  .on('completed', (job, result) => {
    console.log(`Job ${job.queue.name} - Result: ${result} completed!!!`)
  })
  .on('failed', function (job, err) {
    console.log(`Job ${job.queue.name} failed!!!!`)
  })
  .on('removed', function (job) {
    console.log(`Job ${job.queue.name} removed!!!!`)
  })
/**
 * CRON Spec
 * (Mon-Fri / Mon) Weeks  -  Time in 24 hours (mm hr)
 * Full Format 'mm hr ? * w'
 * E.g '50 17 ? * MON'        -> Only on Monday by 5:50pm
 * E.g '50 17 ? * MON-FRI'    -> Monday through Friday by 5:50pm
 */

app.get('/', (req, res, next) => {
  // myQueue.pause().then(() => {
  //   // queue is paused now
  // });

  // myQueue.resume().then(() => {
  //   // queue is resumed now
  // })
  myQueue.add(
    { email: 'obafunsoadebayo@gmail.com' },
    {
      // delay: 60000, // 1 min in ms
      // attempts: 2,
      // removeOnComplete: true - true by default
      // removeOnFail: true - false by default
      repeat: {
        cron: '30 18 ? * TUE',
        // tz: '',
        // startDate: '',
        // endDate: ''
      },
    }
  )
  res.status(200).json({
    data: {
      says: 'Hello World',
    },
  })
})

const server = app.listen(1000, () => {
  console.log('App listening on port 5000!')
})

process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  server.close(process.exit(0))
})

// .on('error', function(error) {
//     // An error occured.
//   })

//   .on('waiting', function(jobId){
//     // A Job is waiting to be processed as soon as a worker is idling.
//   });

//   .on('active', function(job, jobPromise){
//     // A job has started. You can use `jobPromise.cancel()`` to abort it.
//   })

//   .on('stalled', function(job){
//     // A job has been marked as stalled. This is useful for debugging job
//     // workers that crash or pause the event loop.
//   })

//   .on('progress', function(job, progress){
//     // A job's progress was updated!
//   })

//   .on('completed', function(job, result){
//     // A job successfully completed with a `result`.
//   })

//   .on('failed', function(job, err){
//     // A job failed with reason `err`!
//   })

//   .on('paused', function(){
//     // The queue has been paused.
//   })

//   .on('resumed', function(job){
//     // The queue has been resumed.
//   })

//   .on('cleaned', function(jobs, type) {
//     // Old jobs have been cleaned from the queue. `jobs` is an array of cleaned
//     // jobs, and `type` is the type of jobs cleaned.
//   });

//   .on('drained', function() {
//     // Emitted every time the queue has processed all the waiting jobs (even if there can be some delayed jobs not yet processed)
//   });

//   .on('removed', function(job){
//     // A job successfully removed.
//   });
