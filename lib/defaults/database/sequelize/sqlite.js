const fs = require('fs')
const Sequelize = require('sequelize')
const DataTypes = Sequelize.DataTypes
module.exports = (app) => {
  console.log('nuxt-serve: creating sqlite database', `${process.env.PWD}/database.sqlite`)
  const sequelize = new Sequelize({
    // The `host` parameter is required for other databases
    // host: 'localhost'
    dialect: 'sqlite',
    storage: `${process.env.PWD}/database.sqlite`,
    query: {
      raw: true
    },
    define: {
      freezeTableName: true,
      underscored: true,
      createdAt: false,
      updatedAt: false
    }
  })
  console.log(`nuxt-serve: looking for models in ${process.env.PWD}/server/models/'`)
  const modelFiles = fs.readdirSync(process.env.PWD + '/server/models').filter(file => file.endsWith('.model.js'))
  for (const file of modelFiles) {
    const createModel = require(process.env.PWD + `/server/models/${file}`)
    createModel(sequelize, DataTypes)
  }

  const models = sequelize.models
  Object.keys(models).forEach((name) => {
    if ('associate' in models[name]) {
      models[name].associate(models)
    }
  })

  sequelize.sync({ force: false })
  return sequelize
}
