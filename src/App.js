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

  return (
    <div>
      <Router>
        <Header handleChangeInput={(e)=>handleChangeInput(e)} />
        

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



// import React, { useState } from "react";

// function Table() {
//   const [rows, setRows] = useState([
//     { id: 2, name: "John" },
//     { id: 1, name: "Mary" },
//     { id: 3, name: "Bob" },
//   ]);

//   function handleClick() {
//     const sortedRows = [...rows].sort((a, b) => a.id - b.id);
//     setRows(sortedRows);
//   }

//   return (
//     <div>
//       <button onClick={handleClick}>Sort Rows</button>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id}>
//               <td>{row.id}</td>
//               <td>{row.name}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Table;

