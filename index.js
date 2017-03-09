const NanoTimer = require('nanotimer') // TODO this is super slow. Need to replace.

function sample(samples = 10, rate = 250, sampler, cb) {
  if (!sampler) throw new Error('Sampler function required')
  if (!cb) throw new Error('Callback function required')
  const instance = sampler()
  let count = 0
  const timer = new NanoTimer()
  timer.setInterval(() => {
    count = count + 1
    instance.next()
    if (count >= samples) {
      sample(samples, rate, sampler, cb)
      timer.clearInterval()
      cb(instance.dump())
    }
  }, '', `${rate}m`)
}

module.exports = sample
