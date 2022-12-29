const redis = require('../../../helpers/v1/redisConnection')

/**
 *
 * @param {'duration in minute'} duration
 * @description Cache response from server - GET
 */
let cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url

    redis.get(key, (err, cached) => {
      if (cached) {
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.parse(cached))
      } else {
        res.sendResponse = res.send
        res.send = (body) => {
          redis.setex(key, duration * 60, JSON.stringify(body))
          res.sendResponse(body)
        }
        next()
      }
    })
  }
}
module.exports = cache
