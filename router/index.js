const express = require('express')
const Student = require('../student.js')
const router = express.Router()

router.get('/', (req, res) => {
	Student.find((err, students) => {
		if (err) {
			return res.status(500).send('Server error')
		}
		res.render('index.html', {
			fruits: [
				"苹果",
				"香蕉",
				"橘子",
				"西瓜"
			],
			students: students
		})
	})
})

router.get('/student/new', (req, res) => {
	res.render('add.html')
})

router.post('/student/new', (req, res) => {
	// console.log(req.body)
	Student.save(req.body, (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
	})
	res.redirect('/')
})

router.get('/student/edit', (req, res) => {
	// console.log(req.query.id)
	Student.findById(parseInt(req.query.id), (err, student) => {
		if (err) {
			return res.status(500).send('Server error')
		}

		res.render('edit.html', {
			student: student
		})
	})
})

router.post('/student/edit', (req, res) => {
	Student.updateById(req.body, (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
	})
	res.redirect('/')
})

router.get('/student/delete', (req, res) => {
	Student.deleteById(parseInt(req.query.id), (err) => {
		if (err) {
			return res.status(500).send('Server error')
		}
	})
	res.redirect('/')
})

module.exports = router