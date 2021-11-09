const service = require('./generate-service')
const model = require('./generate-model')

const name = process.argv[2]
service(name)
model(name)