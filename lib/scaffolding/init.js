const fs = require("fs");
const { indexFile, serviceFile, modelFile, routeFile } = require('./files');
const makeFile = require("./makeFile");
function buildDirectories() {
  const dirs = [
    "/server",
    "/server/models",
    "/server/services",
    "/server/routes",
  ];

  dirs.forEach((dir) => {
    try {
      if (!fs.existsSync(`${process.env.PWD}${dir}`)) {
        fs.mkdirSync(`${process.env.PWD}${dir}`);
        console.log(`nuxt-serve init: CREATED DIR .${dir}`);
      } else {
        console.log(`nuxt-serve init: DIR EXISTS ${dir}`);
      }
    } catch (error) {
      console.log(`nuxt-serve init: ERROR`, error);
    }
  });
}

function makeFiles() {
  makeFile('/server', 'index', 'js', indexFile)
  makeFile('/server/models', 'model-name.README', 'md', modelFile)
  makeFile('/server/services', 'service-name.README', 'md', serviceFile)
  makeFile('/server/routes', 'route-name.README', 'md', routeFile)
}


buildDirectories()
const base = process.env.PWD
console.log('path =', base)
makeFiles()
