import React from 'react'
import axios from 'axios';


const AddTask = () => {
  
  const token = localStorage.getItem('react-demo-token');

  const headers = {
    token: token,
  };

  const data = {
    title: 'zzzzzz',
    description: 'zzzzzz',
    price: 22222,
    is_active: null,
    category_id: 99,
    //img需要datafrom
  };

  // POST
    function addTasks() {

      axios.post('https://app.spiritx.co.nz/api/products', data, { headers })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
      console.log(token)
    }


  return (
    <div>
      <button onClick={addTasks}>add</button>

    </div>
  )
}

export default AddTask

