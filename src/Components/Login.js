import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";


const Login = () => {

  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');

  const navigate = useNavigate();


  function login_to_swagger() {
    const loginUrl = 'http://localhost:8000/api/login';
    const email = inputEmail;
    const password = inputPassword;

    axios.post(loginUrl, {
      email,
      password
    }).then(res => {
      console.log(res)
      localStorage.setItem('react-demo-token', res.data.token)
      localStorage.setItem('react-demo-user', JSON.stringify(res.data.user))

      setTimeout(() => {
        window.location.reload()
      }, 1000)
      alert('Login Success')
      navigate('/products');
      

    }).catch(err => {
      alert('Login Failure')
      console.log(err.response.data)});

      //token
      const token = localStorage.getItem('react-demo-token');
      // console.log(token)
  }

  

    


  return (
    <div className='login_body'>

      <div className='login_title'>Log in</div>

      <fieldset className='login_field'> 
        <legend className='login_field_title'>Email</legend> 
          <input type="text" className='login_input' value={inputEmail} onChange={(event) => setInputEmail(event.target.value)} />
      </fieldset>

      <fieldset className='login_field'> 
        <legend className='login_field_title'>Password</legend> 
          <input type="password" className='login_input' value={inputPassword} onChange={(event) => setInputPassword(event.target.value)} />
      </fieldset>
      <div className='login_login' onClick={
        login_to_swagger


        //login_to_swagger
        //test@gradspace.org
      } ><Link to="/" className='login_goback'>LOG IN</Link></div>
      
      
    </div>
  )
}

export default Login