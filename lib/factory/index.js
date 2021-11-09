

module.exports = class Factory {
  constructor(items) {
    this.items = items
  }
  build(app) {
    this.items.forEach(item => {
      app = item(app)
    });
    return app
  }
}