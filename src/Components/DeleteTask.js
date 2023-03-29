import React, { useState } from 'react';
import axios from 'axios';

function ProductDelete(props) {
  const [productId, setProductId] = useState('');

  const handleInputChange = (event) => {
    setProductId(event.target.value);
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    axios.defaults.baseURL = 'https://app.spiritx.co.nz/api/';
    axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`;

    axios.delete(`products/${productId}`)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div>
      <h2>Delete Product</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Product ID:</label>
          <input type="text" value={productId} onChange={handleInputChange} />
        </div>
        <button type="submit">Delete</button>
      </form>
    </div>
  );
}

export default ProductDelete;

