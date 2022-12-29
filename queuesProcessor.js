const userCreatedQueue = require('./queues/v1/userCreated')
const userCreatedJob = require('./jobs/v1/userCreated')
const userCreatedEvent = require('./events/v1/userCreated')

/**
 * @description User Created Queuing System
 */
exports.userCreated = {
  queue: userCreatedQueue,
  job: userCreatedJob,
  event: userCreatedEvent,
}
