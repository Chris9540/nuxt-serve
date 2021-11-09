const makeFile = require('../lib/scaffolding/makeFile')
const fs = require('fs')
const hooks = (name) => {return `module.exports = {
  before: {
    all: [],
    create: [],
    get: [],
    update: [],
    patch: [],
    remove: []
  },
  after: {
    all: [],
    create: [],
    get: [],
    update: [],
    patch: [],
    remove: []
  }
}

`}

function makeHooks(name) {
  console.log(`nuxt-serve: generating service ${name}`)
  const path = `${process.env.PWD}/server/services/${name}`
  if (fs.existsSync(path)) {
    makeFile(`/server/services/${name}`, `${name}.hooks`, 'js', hooks(name))
  }
}

const name = process.argv[2]
makeHooks(name)

module.exports = makeHooks