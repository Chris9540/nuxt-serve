const fields = (data) => {
  const fields = []
  Object.keys(data).forEach((field) => {
    fields.push(field)
  })
  return { fields: ['id'].concat(fields) }
}

// const defaultHooks = {
//   before: {
//     all: [],
//     create: [],
//     get: [],
//     update: [],
//     patch: [],
//     remove: []
//   },
//   after: {
//     all: [],
//     create: [],
//     get: [],
//     update: [],
//     patch: [],
//     remove: []
//   }
// }

module.exports = class Service {
  constructor (options) {
    this.config = { hasHooks: false }
    this.config.pagination = options.pagination ? options.pagination : null
    this.Model = options.Model
    this.dataType = this.Model.tableAttributes.id.type.constructor.key
  }

  pagination(query) {
    const result = { where: query }
    if(this.config.pagination) {
      const { pagination } = this.config
      const {$limit, $skip} = query
      result.limit = $limit ? parseInt($limit) : pagination.default
      result.limit = result.limit <= pagination.max ? result.limit : pagination.max
      result.limit === -1 ? delete result.limit : null;
      result.offset = $skip ? parseInt($skip) : 0
    }
    delete result.where.$limit
    delete result.where.$skip
    return result
  }


  async get (id) {
    id = this.dataType === 'INTEGER' ? id = parseInt(id) : id
    return await this.Model.findOne({ where: { id } })
  }

  async find (query = {}) {
    return await this.Model.findAndCountAll(this.pagination(query))
  }

  async create (data) {
    return (await this.Model.create(data, fields(data))).get({ plain: true })
  }

  async update(id, data) {
    return await this.Model.update(data, { where: { id } }).get({ plain: true })
  }

  async remove(id) {
    id = this.dataType === 'INTEGER' ? id = parseInt(id) : id
    return await this.Model.destroy({ where: { id } })
  }

  async count(query) {
    return { total: await this.Model.count({ where: query }) }
  }

  // hooks(options) {
  //   if(!options.before) {options.before = {}}
  //   if(!options.after) {options.after = {}}
  //   const hooks = { 
  //     before : {...defaultHooks.before, ...options.before},
  //     after : {...defaultHooks.after, ...options.after}
  //   }
  //   console.log('hooks', hooks)
  //   this.config.hooks = hooks
  //   this.config.hasHooks = true
  //   this.Model.
  // }

  // runHook() {
  //   if(this.config.hasHooks) {
  //     const { hooks } = this.config
  //   }
  // }
}
