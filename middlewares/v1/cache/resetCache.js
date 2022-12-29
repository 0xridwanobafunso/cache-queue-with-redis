const redis = require('../../../helpers/v1/redisConnection')

/**
 * @description Reset cached response from server - POST, PUT/PATCH, DELETE
 */
let resetCache = (req, res, next) => {
  let key = '__express__' + req.originalUrl || req.url

  redis.get(key, (err, cached) => {
    if (cached) {
      res.sendResponse = res.send
      res.send = (body) => {
        if (JSON.parse(body).success) {
          redis.del(key, () => {
            res.sendResponse(body)
          })
        } else {
          res.sendResponse(body)
        }
      }
      next()
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        res.sendResponse(body)
      }
      next()
    }
  })
}

module.exports = resetCache
