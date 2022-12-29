module.exports = (job) => {
  // Perform Heavy Task here!!!!1
  return Promise.resolve(`${job.data.msg}`)
}
