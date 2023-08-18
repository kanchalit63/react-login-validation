import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import axios from 'axios'


function Login() {

  const [values,setValues] = useState ({
    email : '',
    password : '',

  })

  const navigate = useNavigate();

  const [errors,setErrors] = useState({})


  const handleSubmit = (event) =>{
    event.preventDefault();
    setErrors(Validation(values))
    if ( errors.email === "" && errors.password === "") {
      axios.post('http://localhost:5050/login', values)
          .then(res => {
              if(res.data === "Success"){
                navigate('/home')
              }else{
                alert("No record exited")
              }
          })
          .catch(err => console.log(err))
  };
  }

  const handlepInput = (event) =>{
    setValues(prev => ({...prev,[event.target.name]:[event.target.value]}))
  }


  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2>Log in</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Email</label>
            <input type="email" name="email"  placeholder='Enter email' className='form-control rounded-0' onChange={handlepInput}/>
          {errors.email && <span className='text-danger'>{errors.email}</span>}
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder='Enter password' className='form-control rounded-0' onChange={handlepInput} />
            {errors.password && <span className='text-danger'>{errors.password}</span>}
          </div>
          <button type='submit' className='btn btn-success w-100'><strong>Log in</strong></button>
          <p>Your are agree to aout terms and policies</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light'>Create Account</Link>
        </form>
      </div>
    </div>
  )
}

export default Login