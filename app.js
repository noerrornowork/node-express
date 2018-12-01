const express = require('express')
const path = require('path')
const router = require('./router')
const bodyParser = require('body-parser')

// 创建app服务
const app = express()

// 设置模板引擎
app.engine('html', require('express-art-template'))

// 托管静态资源
app.use('/node_modules/', express.static('./node_modules'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(router)

// 监听服务端口
app.listen(3020, () => {
	console.log('Your application is running at port 3020...')
})