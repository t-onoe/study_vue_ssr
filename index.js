// vueインスタンス生成
const Vue = require('vue');
const express = require('express'); 
const serverRenderer = require('vue-server-renderer');
const server = express();

const renderer = serverRenderer.createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
});

const context = {
    title: 'Heloooooooooooooooo'
};

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>The visited URL is: {{ url }}</div>`
    });

    renderer.renderToString(app, context).then(html => {
        res.end(html);
        console.log('access!!');
    }).catch(err => {
        console.error(err);
    })
});

server.listen(8080);

console.log('open -> localhost:8080');