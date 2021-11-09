const bodyParser = require('body-parser')
let app = require('express')()
const { model, models, createService, service, serviceWorker } = require('./app')
const Services = require('../factory/service')
const Routes = require('../factory/route')
const Factory = require('../factory/index')
const factory = new Factory([Services, Routes])
const defaultConfig = require('../defaults/config/default')

function addAppFunctions(app) {
  app.model = model(app)
  app.models = models(app)
  app.createService = createService(app)
  app.service = service(app)
  app.serviceWorker = serviceWorker(app)
  return app
}

function addDataStorage(app) {
  if(app.nuxtServe.config) {
    const { database } = app.nuxtServe.config
    if(database) {
      if(typeof database === 'string') {
        if(database === 'sqlite') {
            const sqlite = require('../defaults/database/sequelize/sqlite')
            app.set('database', sqlite(app))
            console.log('nuxt-serve: sqlite database connected')
        } else {
          console.log('nuxt-serve: Only sqlite is supported please use a database connection')
        }
      }
      else if (typeof database === 'function') {
        app.set('database', database(app))
      }
    }
  }
  return app
}

module.exports = (options = null) => {
  const config = {...defaultConfig, ...options}
  app.nuxtServe = {
    config,
  }
  console.log('nuxt-serve: loading configuration', config, '\nnuxt-serve: options', options)
  app.set('pagination', config.pagination)
  app = addAppFunctions(app)
  app = addDataStorage(app)
  app.use(bodyParser.json())
  app = factory.build(app)
  return app
}