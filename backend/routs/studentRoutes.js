const express = require('express')
const Student = require('../models/studentModel')

// importing multer and path
const path = require('path')
const multer = require('multer')

const router = express.Router()

// route - to upload images
// file ko store krna
const storage = multer.diskStorage({
    destination : (req, file, callBack) => {
        callBack(null, 'uploads/') // uploads folder k andr
    },
    filename : (req, file, callBack) => {
        //original file extension lena
        const extension = path.extname(file.originalname)
        callBack(null, Date.now() + extension)
    }
})
const upload = multer({storage})

// create students      // post method to upload image
router.post('/register', upload.single('image'), async (req, res) => {
    try {
        console.log('Request Body:', req.body)
        const { name, email, age } = req.body;

        // image k lye
        const image = req.file ? `/uploads/${req.file.filename}` : null

        const student = new Student({ name, email, age, image })
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

// update student details      // put method to update image
router.put('/viewStudent/:id', upload.single('image'), async (req, res) => {
    try {

        // image k lye kr rhe h
        const {name, email, age} = req.body
        const updateFields = {name, email, age}
        if(req.file)
            updateFields.image = `/uploads/${req.file.filename}`

        const updatedStudent = await Student.findByIdAndUpdate(
            req.params.id,
            // req.body
            updateFields,
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