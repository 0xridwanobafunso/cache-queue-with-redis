const Queue = require('bull')

const queue = new Queue('UserCreated', {
  redis: {
    port: 17464,
    host: 'redis-17464.c8.us-east-1-2.ec2.cloud.redislabs.com',
    password: 'PhfQAfiNa9kPbyFTfbNZZeH3a1B24ymB',
  },
})

module.exports = queue
