import { useEffect, useState } from 'react'
import './App.css'


import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import Form from './Form'
import Display from './Display'
import Update from './Update'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Display />} />  
          <Route path="/form" element={<Form />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
