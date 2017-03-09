# data-sample

Sometimes you need to continuously sample data into fixed sized buckets.

`data-sample` will call a sampler function a set number of times at a set interval (in milliseconds) and will return a data bucket when done. At this point it will call itself and run recursively forever.

## Samplers
A sampler is a function with 2 methods: `.next()` which acquires the next sample and `.dump()` which returns the sample bucket.

## Usage
`sample(sampleCount, sampleRate, samplerFn, callbackFn)`

## Example
The following example will collect samples every second and return a 10 sample bucket every 10 seconds.

```js
const sample = require('data-sample')
const testSampler = () => {
  let bucket = []
  return {
    next: () => bucket.push(bucket.length + 1),
    dump: () => bucket,
  }
}
sample(10, 1000, sampler, console.log)
```

## Possible improvements
* `setInterval` is unreliable so the `nanotimer` library is used to address this. The library is not super performant and consumes way too much CPU when running fast (eg 100ms). This should be replaced with more efficient code.
* Might make sense to implement an event emitter and to emit buckets instead of or in addition to the callback. A callback is more immediate so might be more preferred. Events can be better scaled.
* At the moment the loop is recursive once started. It will probably be a good idea to have an api to stop/start it or an option to run just once.
