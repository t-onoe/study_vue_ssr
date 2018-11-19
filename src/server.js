const express = require('express')
const server = express()
const serverRenderer = require('vue-server-renderer')
const createApp = require('./app')

const renderer = serverRenderer.createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})
const context = {
  title: 'HeloooEE'
}

server.get('*', (req, res) => {
  const app = createApp(context)

  renderer.renderToString(app, context).then(html => {
    res.end(html)
    console.log('access!!')
  }).catch(err => {
    console.error(err)
  })
})

server.listen(8080)
console.log('open -> localhost:8080')
