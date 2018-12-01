/**
 * 封装异步API,只操作文件数据,不关心具体业务
 */
const fs = require('fs')

const dbPath = './db.json'

/**
 * 读取文件,作为根据函数
 */
// function read (cb) {
// 	fs.readFile(dbPath, 'utf8', (err, data) => {
// 		if (err) {
// 			return cb(err)
// 		}
// 		cb(JSON.parse(data).students)
// 	})
// }

/**
 * 写入文件
 */
function write (dbPath, data, cb) {
	fs.writeFile(dbPath, data, (err) => {
		if (err) {
			return cb(err)
		}
		cb(null)
	})
}
/**
 * 获取所有学生列表
 */
exports.find = (callback) => {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		callback(null, JSON.parse(data).students)
	})
}

/**
 * 根据id获取单个学生的信息
 */
exports.findById = (id, callback) => {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		let students = JSON.parse(data).students
		let student = students.find((item) => {
			return item.id === id
		})

		callback(null, student)
	})
}
/**
 * 新增学生
 */
exports.save = (student, callback) => {
	// console.log(student)
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			callback(err)
		}
		data = data || {}
		let students = JSON.parse(data).students
		// 说明文件没有数据
		if (students.length === 0) {
			student.id = 1
		} else {
			student.id = parseInt(students[students.length - 1].id) + 1
		}
		
		students.push(student)

		let fileData = JSON.stringify({
			students: students
		})

		// fs.writeFile(dbPath, fileData, (err) => {
		// 	if (err) {
		// 		return callback(err)
		// 	}
		// 	callback(null)
		// })
		write(dbPath, fileData, callback)
	})
}
/**
 * 更新学生
 */
exports.updateById = (student, callback) => {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		let students = JSON.parse(data).students
		let stu = students.find((item) => {
			return item.id === parseInt(student.id)
		})
		console.log(stu)

		// 遍历拷贝对象
		for (key in student) {
			stu[key] = student[key]
		}

		let fileData = JSON.stringify({
			students: students
		})

		// fs.writeFile(dbPath, fileData, (err) => {
		// 	if (err) {
		// 		return callback(err)
		// 	}
		// 	callback(null)
		// })
		write(dbPath, fileData, callback)
	})
}
/**
 * 删除学生
 */
exports.deleteById = (id, callback) => {
	fs.readFile(dbPath, 'utf8', (err, data) => {
		if (err) {
			return callback(err)
		}
		let students = JSON.parse(data).students
		let deleteId = students.findIndex((item) => {
			return item.id === id
		})

		students.splice(deleteId, 1)

		let fileData = JSON.stringify({
			students: students
		})

		// fs.writeFile(dbPath, fileData, (err) => {
		// 	if (err) {
		// 		return callback(err)
		// 	}
		// 	callback(null)
		// })
		write(dbPath, fileData, callback)
	})
}