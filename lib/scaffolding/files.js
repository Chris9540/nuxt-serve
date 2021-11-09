const indexFile = `const { NuxtServe } = require('nuxt-serve')
const app = NuxtServe()

export default {
  path: '/api',
  handler: app
}
`

const serviceFile = `# /service-name/service-name.service.js
\`\`\`
const { Service } = require('nuxt-serve')

module.exports = (app) => {
  const options = {
    Model: app.model('model_name'),
    pagination: app.get('pagination')
  }
  const service = new Service(options)
  app = app.createService('service-name', service)
  return app
}
\`\`\`
`
const modelFile = `# /model-name/model-name.model.js
\`\`\`
module.exports = (database, DataTypes) => {

  const Model = database.define('model_name', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })

  Model.associate = function (models) {
    Model.hasMany(models.example, {
      foreignKey: '',
      as: ''
    })
    Model.belongsTo(models.example, {
      foreignKey: '',
      as: ''
    })
  }

  return Model
}
\`\`\`
`

const routeFile = `# /route-name/route-name.route.js
\`\`\`
module.exports = (app) => {
  // extra route not handled by get: '/', '/:id & post: '/', '/:id'
  app.get('/route-name/extra-route', async function (req, res, next) {
    const service = req.app.service('service-name')
    res.send({
      data: 'route-data'
    })
  })

  return app
}
\`\`\`
`


module.exports = {
  indexFile,
  serviceFile,
  modelFile,
  routeFile,
}