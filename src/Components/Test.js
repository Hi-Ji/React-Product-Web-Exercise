import React from 'react';
import axios from 'axios';

const Test = () => {
  const token = localStorage.getItem('react-demo-token');

  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState(Number)
  const [image, setImage] = React.useState(null)

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'multipart/form-data',
  };
  const addTasks = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('slug', 99);
    image && formData.append('product_image', image, image.name)
    
    console.log(image)

    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    axios.post(`http://localhost:8000/api/products`, formData, {headers})
    .then(response => {
      console.log(response.data);
      setName('')
      setDescription('')
      setPrice(null)
      //setImage(null)
      // window.location.reload();
      // replaceReloadForAdd(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  };

  return (
    <div>
      <input type="text" value={name} onChange={(e)=>setName(e.target.value)} />
      <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} />
      <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} />
      <input
        type="file"
        accept="image/*"
        onChange={(e)=>setImage(e.target.files[0])}
      />
      <button onClick={addTasks}>test</button>
    </div>
  )
}

export default Test
