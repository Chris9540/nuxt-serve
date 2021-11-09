const glob = require('glob')
const PATH = process.env.PWD + '/server/routes/'
module.exports = (app) => {
  console.log('nuxt-serve: looking for routes in', PATH)
  glob(PATH + '**/*', (err, res) => {
    if (err) { console.log(err) } else {
      const serviceFiles = res.filter(file => file.endsWith('.route.js'))
      serviceFiles.forEach((file) => {
        const route = require(file)
        app = route(app)
        console.log('nuxt-serve: adding route')
      })
    }
  })
  return app
}