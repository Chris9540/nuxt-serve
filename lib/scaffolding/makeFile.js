const fs = require('fs')
module.exports = (path, name, ext, data) => {
  try {
    fs.writeFileSync(process.env.PWD + `${path}/${name}.${ext}`, data, {encoding: "utf8"})
    console.log(`nuxt-serve init: CREATED FILE .${path}/${name}.${ext}`);
  } catch (error) {
    console.log(`nuxt-serve init: ERROR`, error);
  }
}