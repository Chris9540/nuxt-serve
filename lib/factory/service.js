
const glob = require('glob')
const PATH = process.env.PWD + '/server/services/'
module.exports = (app) => {
  glob(PATH + '**/*', (err, res) => {
    if (err) { console.log(err) } else {
      const serviceFiles = res.filter(file => file.endsWith('.service.js'))
      serviceFiles.forEach((file) => {
        const createService = require(file)
        app = createService(app)
        console.log('nuxt-serve: adding service ', file)
      })
    }
  })
  return app
}
