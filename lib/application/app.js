const addRoutes = require('./addDefaultRoutes')

function model (app) {
  return function (name) {
    const { models } = app.get('database')
    return  models[name]
  }
}

function models (app) {
  return function (...names) {
    const result = {}
    const { models } = app.get('database')
    names.forEach((name) => {
      result[name] = models[name]
    })
    return result
  }
}

function createService (app) {
  return function (name, service) {
    app.set(`service[${name}]`, service)
    app = addRoutes(app, name)
    return app
  }
}

function service (app) {
  return function (name) {
    return app.get(`service[${name}]`)
  }
}
function serviceWorker (app) {
  return function (name, worker) {
    const service = app.get(`service[${name}]`)
    return service[worker]
  }
}


module.exports = {
  model,
  models,
  createService,
  service,
  serviceWorker,
}
