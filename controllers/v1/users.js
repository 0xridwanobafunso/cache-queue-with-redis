const { userCreated } = require('../../queuesProcessor')
/**
 * @description To get all users
 * @route       /api/v1/users
 * @access      Public
 */
exports.getUser = (req, res, next) => {
  //   userCreated.queue.add({ msg: 'Hello World' })

  userCreated.queue.add({ msg: 'Hello' })

  res.status(200).json({
    data: 'Hello',
  })
}

// Event Listeners for userCreated.queue.on()
const userCreatedEventListener = () => {
  return
}
