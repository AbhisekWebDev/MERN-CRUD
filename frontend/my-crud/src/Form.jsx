import React, { useState } from 'react'
import axios from 'axios'

function Form() {

    const [formData, setFormData] = useState(
        {
            name : '',
            email : '',
            age : ''
        }
    )

    // file upload k lye - state
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        setFormData(
            {
                ...formData,
                [e.target.name] : e.target.value

            }
        )
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        // image add krna aur saare data ko opject k andr append krwana
        const data = new FormData()
        data.append('name', formData.name)
        data.append('email', formData.email)
        data.append('age', formData.age)
        data.append('image', file)

        try {
            await axios.post('http://localhost:5000/students/register', data, {
              headers : {'Content-Type' : 'multipart/form-data'}
            })
            alert('success')
            setFormData(
                {
                    name : '',
                    email : '',
                    age : ''
                }
            )
            setFile(null)
        } catch(err) {
            alert('Error adding user')
            console.log(err)
        }
    }

  return (
    <div>
      <h2>Enter Details To Register</h2>
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
            value={formData.name}
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
            value={formData.email}
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
            value={formData.age}
            onChange={handleChange}
          />
        </div>
        <div className="form-group text-start mb-3">
          <label htmlFor="exampleInputImage">Upload Image</label>
          <input
            type="file"  // ye dena zruri h
            className="form-control"
            id="exampleInputImage"
            placeholder="Enter Image"
            name="image"  // ye dena zruri h
            // value={formData.image}
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Form