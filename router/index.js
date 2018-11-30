const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
	res.render('index.html')
})

router.get('/student/new', (req, res) => {

})

router.post('/student/new', (req, res) => {
	
})

router.get('/student/edit', (req, res) => {
	
})

router.post('/student/edit', (req, res) => {
	
})

router.get('/student/delete', (req, res) => {
	
})

module.exports = router