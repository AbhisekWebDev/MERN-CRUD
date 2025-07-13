import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

function Display() {

    const [students, setStudents] = useState([])

    useEffect(() => {
      axios.get('http://localhost:5000/students/viewStudent')
        .then(res => setStudents(res.data))
        .catch(err => console.error('Error fetching users:', err))
    }, [])

    // delete operation
    const handleDelete = async (id) => {
        const cnfDlt = window.confirm("Pakka udana h?")
        if(!cnfDlt) return

        try{
            await axios.delete(`http://localhost:5000/students/viewStudent/${id}`)
            alert("Deleted successfully!")

            // refetch/update state to remove deleted item
            setStudents(prev => prev.filter(student => student._id !== id))
        } catch (err) {
            console.error("Error deleting student:", err);
            alert("Error deleting student");
        }
    }

  return (
    <div>
        <div className="container mt-5">
        <div className="container text-start mb-3">
          <Link to = '/form'><button type="button" className="btn btn-success">Add</button></Link>
        </div>
          <table className='table table-primary'>
            <thead>
              <tr className='table-secondary'>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Age</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
            {students.length > 0 ? (
              students.map((student, index) => (
                <tr className="table-secondary" key={index}>
                  <td>{student._id}</td>
                  <td className="table-success">{student.name}</td>
                  <td className="table-success">{student.email}</td>
                  <td className="table-success">{student.age}</td>
                                  {/* aise krna hoga */}
                  <td><Link to = {`/update/${student._id}`}><button className="btn btn-primary">Edit</button></Link></td>
                  <td><button className="btn btn-danger" onClick={() => handleDelete(student._id)}>Delete</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center">Loading or no data</td>
              </tr>
            )}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default Display