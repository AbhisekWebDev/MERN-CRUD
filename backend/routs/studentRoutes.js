const express = require('express')
const Student = require('../models/studentModel')

const router = express.Router()

// create students
router.post('/register', async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { name, email, age } = req.body;
        const student = new Student({ name, email, age })
        await student.save()
        res.status(201).json(student)
    } catch (err) {
        console.error('Error occurred:', err)
        res.status(500).json({ message: 'Error creating student' })
    }
})

// get all students
router.get('/viewStudent', async (req, res) => {
    try {
        const students = await Student.find()
        res.status(200).json(students)
    } catch(err) {
        res.status(400).json({message : 'error'})
    }
})

// get student by ID
router.get('/viewStudent/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if(!student){
            return res.status(404).json({ message: 'Student not found' })
        }
        res.status(200).json(student);
    } catch(err) {
        res.status(400).json({message : 'error'})
    }
})

// update student details
router.put('/viewStudent/:id', async (req, res) => {
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: 'Student not found' })
        }
        res.status(200).json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
})

// delete student details
router.delete('/viewStudent/:id', async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id)
        if (!deletedStudent) {
            return res.status(404).json({ message: 'Student not found' })
        }
        res.status(200).json({ message: 'Student deleted successfully' })
    } catch (err) {
        res.status(400).json({ message: 'error' })
    }
})

module.exports = router