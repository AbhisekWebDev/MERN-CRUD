const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors') // cross origin resource aharing

require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('connected'))
.catch((err) => console.log('error', err))

const studentRoutes = require('./routs/studentRoutes') // import routes
app.use('/students', studentRoutes)

app.get('/', (req, res) => {
    res.send('running')
})

// serve the uploaded images statically
const path = require('path')
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})