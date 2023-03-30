import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Header from './Components/Header'
import Products from './Components/Products'
import Login from './Components/Login'
import AddTask from './Components/AddTask'
import ProductDelete from './Components/DeleteTask';
import Test from './Components/Test';

//test@gradspace.org


const App = () => {

  const [input, setInput] = useState('')
  function handleChangeInput(e){
    setInput(e)
  }
  const token = localStorage.getItem('react-demo-token');

  return (
    <div>
      <Router>
        {token!=null?<Header handleChangeInput={(e)=>handleChangeInput(e)} />:''}
        {/* <Header handleChangeInput={(e)=>handleChangeInput(e)} /> */}
        {/* <Test /> */}
        <Routes>
          <Route path="/" element={<Login  />} />
          <Route path="/products" element={<Products search={input} />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
