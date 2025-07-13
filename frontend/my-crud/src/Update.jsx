import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom' // to get the ID from the route
import axios from 'axios'

function Update() {

    const {id} = useParams() // fetch the student ID from the URL
    console.log("Editing student ID:", id)

    const [updateData, setUpdateData] = useState(
        {
            name : '',
            email : '',
            age : ''
        }
    )

    const handleChange = (e) => {
        setUpdateData(
            {
                ...updateData,
                [e.target.name] : e.target.value

            }
        )
    }

    useEffect(() => {
      axios.get(`http://localhost:5000/students/viewStudent/${id}`)
        .then(res => setUpdateData(res.data))
        .catch(err => console.error('Error fetching users:', err))
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // put - to update data
            await axios.put(`http://localhost:5000/students/viewStudent/${id}`, updateData)
            alert('update success')
        } catch(err) {
            alert('Error adding user')
            console.log(err)
        }
    }

  return (
    <div>
        <h2>Update Your Data</h2>
          <form className="mt-5 mx-auto w-50" onSubmit={handleSubmit}>
              <div className="form-group text-start mb-3">
                  <label htmlFor="exampleInputName">Name</label>
                  <input
                      type="text"
                      className="form-control"
                      id="exampleInputName"
                      aria-describedby="nameHelp"
                      placeholder="Enter name"
                      name="name"  // ye dena zruri h
                      value={updateData.name}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-group text-start mb-3">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"  // ye dena zruri h
                      value={updateData.email}
                      onChange={handleChange}
                  />
              </div>
              <div className="form-group text-start mb-3">
                  <label htmlFor="exampleInputAge">Age</label>
                  <input
                      type="number"  // ye dena zruri h
                      className="form-control"
                      id="exampleInputAge"
                      placeholder="Enter age"
                      name="age"  // ye dena zruri h
                      value={updateData.age}
                      onChange={handleChange}
                  />
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
          </form>
    </div>
  )
}

export default Update