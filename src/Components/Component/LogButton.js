import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const LogButton = ( {title, on_click=null, page} ) => {
  return (
    <Link to={page} className='header_link_l' >
      <div onClick={on_click}>{title}</div>
      {console.log(page)}
    </Link>
  )
}

export default LogButton
