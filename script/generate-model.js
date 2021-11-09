const makeFile = require('../lib/scaffolding/makeFile')
const fs = require('fs')
const model = (name) => {
  return `module.exports = (database, DataTypes) => {

  const Model = database.define('${name}', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  })

  // Model.associate = function (models) {
  //   Model.hasMany(models.example, {
  //     foreignKey: '',
  //     as: ''
  //   })
  //   Model.belongsTo(models.example, {
  //     foreignKey: '',
  //     as: ''
  //   })
  // }

  return Model
  }
`}

function makeModel(name) {
  console.log(`nuxt-serve: generating service ${name}`)
  makeFile(`/server/models`, `${name}.model`, 'js', model(name.split('-').join('_')))
}

const name = process.argv[2]
makeModel(name)

module.exports = makeModel
