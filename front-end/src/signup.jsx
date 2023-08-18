import React, { useState } from 'react';
import Validation from './Signupvalidation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '' // เพิ่มฟิลด์ยืนยันรหัสผ่าน
    });

    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));
        if (errors.name === "" && errors.email === "" && errors.password === "") {
            axios.post('http://localhost:5050/signup', values)
                .then(res => {
                    navigate('/')
                })
                .catch(err => console.log(err))
        };
    };

    const handlepInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));

    };

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="" onSubmit={handleSubmit}>
                    <h2>Sign Up</h2>
                    <div className='mb-3'>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" placeholder='Enter name' className='form-control rounded-0' onChange={handlepInput} />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder='Enter email' className='form-control rounded-0' onChange={handlepInput} />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" placeholder='Enter password' className='form-control rounded-0' onChange={handlepInput} />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder='Confirm password' className='form-control rounded-0' onChange={handlepInput} />
                        {values.confirmPassword !== values.password && <span className='text-danger'>Passwords do not match</span>}
                    </div>
                    <button type="submit" className='btn btn-success w-100'><strong>Sign up</strong></button>
                    <p>Your are agree to our terms and policies</p>
                    <Link to="/" className='btn btn-default border w-100 bg-light'>Login</Link>
                </form>
            </div>
        </div>
    );
}

export default Signup;
