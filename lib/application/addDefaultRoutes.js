function create (serviceName) {
  return async function (req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.create(req.body)
    return res.send(data)
  }
}

function get (serviceName) {
  return async function (req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.get(req.params.id)
    return res.send(data)
  }
}

function update (serviceName) {
  return async function (req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.update(req.params.id, req.body)
    return res.send(data)
  }
}

function find (serviceName) {
  return async function (req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.find(req.body)
    return res.send(data)
  }
}

function remove (serviceName) {
  return async function (req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.remove(req.params.id)
    return res.send(data)
  }
}

function count (serviceName) {
  return async function(req, res, next) {
    const service = req.app.service(serviceName)
    const data = await service.count(req.body)
    return res.send(data)
  }
}



/**
 * 
 * @param {Object} app
 * @param {String} name
 */
module.exports = (app, name) => {
  app.get(`/${name}`, find(name))
  app.get(`/${name}/count`, count(name))
  app.get(`/${name}/:id`, get(name))
  app.delete(`/${name}/:id`, remove(name))
  app.post(`/${name}`, create(name))
  app.post(`/${name}/:id`, update(name))
  return app
}