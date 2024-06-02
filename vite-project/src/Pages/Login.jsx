import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../assets/css/form.css'
import Validation from '../Components/validation';
import axios from 'axios'
import {toast} from 'react-toastify'
import { UserContext } from '../App';
// import "react-toastify/dist/ReactToastify.css"



const Login = () => {
  const [values,SetValues] = useState({
    email:'',
    password:''
  })
  const {user, setUser} = useContext(UserContext)
  const [errors, setErrors] = useState({})
  const [ServerErrors, setServerErrors] = useState([])
  const navigate = useNavigate()

  const handleInput = (event) => {
    SetValues({...values, [event.target.name]: event.target.value})

  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = Validation(values)
    setErrors(errs)
    if(errs.email === "" && errs.password === ""){
      axios.post('http://127.0.0.1:3000/contactmsyt/login', values)
      .then(res=> {
        if(res.data.success){

          toast.success("Login Successfully",{
           position: "top-right",
           autoClose: "5000"
          })
          localStorage.setItem("token", res.data.token)
          setUser(res.data.user)
          navigate('/dashboard')
        }

      }).catch(err =>{
        console.log(err)
        if(err.response.data.errors){
          setServerErrors(err.response.data.errors)

        }else{
          console.log(err)
        }
      })

    }
  }
  return (
    <div className='form-container'>
      <form className="form" onSubmit={handleSubmit}  >
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email" className='form-label'>
            Email: 
          </label>
          <input 
            type="email" 
            placeholder='Enter Email' 
            className='form-control' 
            name='email'
            autoComplete='off'
            onChange={handleInput}  
          />
           {
            errors.email && <span className="error">{errors.email}</span>
          }
        </div>
        <div className="form-group">
          <label htmlFor="password" className='form-label'>
            Password: 
          </label>
          <input 
            type="password" 
            placeholder="******"
            className='form-control' 
            name='password' 
            onChange={handleInput}
          />
           {
            errors.password && <span className="error">{errors.password}</span>
          }
        </div>
        {
          ServerErrors.length > 0 && (
            ServerErrors.map((error, index) => (
              <p className="error" key={index}>{error.msg}</p>
            ) )
          )
        }
        <button className="form-btn">Login</button>
        <p>Don't Have Account? <Link to="/register">Register</Link></p>
      </form>
    </div>

  );
};

export default Login;
