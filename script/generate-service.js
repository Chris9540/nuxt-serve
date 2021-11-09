const makeFile = require('../lib/scaffolding/makeFile')
const fs = require('fs')
const service = (name) => {
  return `const { Service } = require('nuxt-serve')
module.exports = (app) => {
  const options = {
    Model: app.model('${name.split('-').join('_')}'),
    pagination: app.get('pagination')
  }
  app = app.createService('${name}', new Service(options))
  return app
}

`}

function makeService(name) {
  console.log(`nuxt-serve: generating service ${name}`)
  const path = `${process.env.PWD}/server/services/${name}`
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path)
    makeFile(`/server/services/${name}`, `${name}.service`, 'js', service(name))
  }
}

const name = process.argv[2]
makeService(name)

module.exports = makeService