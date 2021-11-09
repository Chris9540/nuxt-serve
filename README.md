# Nuxt Serve

## Get Started

### Install

```
npm i git+https://github.com/Chris9540/nuxt-serve.git
```

### Add to package.json

```
"scripts" : {
  "init-nuxt-serve": "node ./node_modules/nuxt-serve/lib/scaffolding/init.js",
  "add-service": "node ./node_modules/nuxt-serve/script/generate-service.js",
  "add-model": "node ./node_modules/nuxt-serve/script/generate-model.js"
  "add-new": "node ./node_modules/nuxt-serve/script/generate-service-and-model.js"
}
```

### Run command

```
npm run init-nuxt-serve
```

### Add to nuxt.config.js

```
serverMiddleware: [
  '~/server/index.js'
],
```

## Limitations

At the moment it only supports `sequelize` for data storage. As it's designed for small projects it supports sqlite 
