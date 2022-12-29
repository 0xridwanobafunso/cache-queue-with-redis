const Redis = require('ioredis')

const redis = new Redis({
  port: 17464, // Redis port
  host: 'redis-17464.c8.us-east-1-2.ec2.cloud.redislabs.com', // Redis host
  family: 4, // 4 (IPv4) or 6 (IPv6)
  password: 'PhfQAfiNa9kPbyFTfbNZZeH3a1B24ymB',
})

module.exports = redis
