import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import EditIcon from '@mui/icons-material/Edit';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import Add_Sort_product from './AddSortProduct';
import { editApiGet, editApiPost } from './Service/editService';
import { addApiGet, addApiPost } from './Service/addService';

const token = localStorage.getItem('react-demo-token');

const headCells = [
  { id: 'name', label: 'Name', align: 'center',},
  {
    id: 'description',
    label: 'Description',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'price',
    label: 'Price',
    align: 'center',
  },
  {
    id: 'product_image',
    label: 'Image',
    align: 'center',
  },
];

if (token != null) {
  headCells.push({
    id: 'action',
    label: 'Action',
    align: 'center',
  });
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

//============================================
const EnhancedTable = ( { search } ) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState([])
  const [tempRows, setTempRows] = useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  //-----------------------------------------

  const [tasks, setTasks] = useState([])
  const [tempTasks, setTempTasks] = useState([])

  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [excel, setExcel] = useState([])
    const excelData = (e)=>{
      setExcel([...excel,...e])
    }

  useEffect(() => {
    getTasks()
    console.log(excel)
    console.log(tasks)
  }, [setTasks,excel])

  const getTasks = async () => {
    const taskFromServer = await fetchTasks()

    if(excel.length !=0){
      excel.map((e)=>taskFromServer.push({name:e.Name,description:e.Description,price:e.Price,id:e.Id}))
    }

    setTasks(taskFromServer)
    setTempTasks(taskFromServer)
  }

const fetchTasks = async () => {
  const res = await fetch('http://localhost:8000/api/products')
  const data = await res.json()
  return data;
}

function outputImg(img) {
  let imgAddress='http://localhost:8000/storage/' + img;
  let product_image = <img src={imgAddress} className='product_img' />;
  return product_image;
}
//api to img ^ ^

  //Add product
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState(Number)
  const [image, setImage] = React.useState(null)

  //cancel add reload 
  const replaceReloadForAdd =(data)=>{
    setTasks([...tasks,
      {name:data.name,
        description:data.description,
        id:data.id,
        price:data.price,
        image:<img src={`http://localhost:8000/storage/${data.product_image}`} />}])
    getTasks()
  }


  //向后端add Product
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
    image && formData.append('product_image', image)
    
    for (let pair of formData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }
    addApiPost(`products`, formData, {headers})
    .then(response => {
      console.log(response.data);
      handleChangeShowRowsInputClose();
      setName('')
      setDescription('')
      setPrice(null)
      setImage(null)
      replaceReloadForAdd(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  };

  //delete id number
  const [delete_id_num, setDelete_id_num] = useState(Number);
  useEffect(() => {
    deleteTasks(delete_id_num)
  }, [delete_id_num]);
  const handleChangeDeleteId = (id) => {
    setDelete_id_num(id);
  }

  //从后端删除
  const deleteTasks = (id) =>{
    axios.delete('http://localhost:8000/api/products/'+id, { headers })
    .then(response => {
      console.log(response.data);
      replaceReloadForDelete(response.data)
    })
    .catch(error => {
      console.error(error);
    });
  }

  //cancel delete reload 
  const replaceReloadForDelete =(data)=>{
    setTasks(tasks.filter((task)=>task.id!=data.id))
    setExcel(excel.filter((task)=>task.id!=data.id))
    getTasks()
    console.log(data.id)
    // console.log(data.product_image)
  }

//product input show set
  const [showRowsInput, setShowRowsInput] = useState(false);
  const handleChangeShowRowsInputOpen = () =>{
    setShowRowsInput(true)
  }
  const handleChangeShowRowsInputClose = () =>{
    setShowRowsInput(false)
  }


  //product input
  const rowsInput = [{
    name:<input type="text" className='product_input' value={name} onChange={(e)=>setName(e.target.value)} />,
    description:<input type="text" className='product_input' value={description} onChange={(e)=>setDescription(e.target.value)} />,
    price:<input type="number" className='product_input' value={price} onChange={(e)=>setPrice(e.target.value)} />,
    product_image:
    <div>
      {image!=null? <img className='selectImg' src={window.URL.createObjectURL(image)}/>:''}
      <input
        type="file"
        style={{ display: 'none' }}
        accept="image/*"
        ref={fileInputRef}
        onChange={(e)=>setImage(e.target.files[0])}
      />
      <DriveFolderUploadIcon 
        onClick={handleIconClick} className='product_image_input' />
    </div>,
    action:
      <div>
        <DoneIcon className={`product_yes_no_icon ${name==''||description==''||price==''?'untouch':''}`} onClick={addTasks} />
        <ClearIcon className='product_yes_no_icon' onClick={()=>{handleChangeShowRowsInputClose();setName('');
        setDescription('');
        setPrice(null);
        setImage(null);}}  />
      </div>
  }];



  
  //edit id number
  const [edit_id_num, setEdit_id_num] = useState(null);
  

  const handleChangeEditId = (id) => {
    setEdit_id_num(id);
  }

  const handleChangeClearEditId = () => {
    setEdit_id_num(null);
  }

  //Show Edit Delete or Yes No
  const [showED, setShowED] = useState(true);
  const [showYN, setShowYN] = useState(true)

  useEffect(() => {
    EDorYN()
  }, [delete_id_num]);

  const handleChangeOpenED = () => {
    setShowED(true);
  }

  const handleChangeCloseED = () => {
    setShowED(false);
  }

  const handleChangeOpenYN = () => {
    setShowYN(!showYN);
  }

  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [editPrice, setEditPrice] = useState(Number)
  const [editImage, setEditImage] = useState(null)

  const [tempEditName, setTempEditName] = useState('')
  const [tempEditDescription, setTempEditDescription] = useState('')
  const [tempEditPrice, setTempEditPrice] = useState(Number)
  const [tempEditImage, setTempEditImage] = useState(null)

  //Edit Delete button 
  function Edit_delete_button(e){
    return (<div className='div_of_edit_delete'>
      <EditIcon className='product_edit_delete_icon' onClick={()=>{handleChangeEditId(e.id);handleChangeCloseED();handleChangeOpenYN();
      setEditName(e.name);
      setEditDescription(e.description);
      setEditPrice(e.price);
      setTempEditName(e.name);
      setTempEditDescription(e.description);
      setTempEditPrice(e.price);
      }} />
      <DeleteIcon className='product_edit_delete_icon' onClick={()=>{handleChangeDeleteId(e.id)}} /></div>)
  }

  //Edit product
  const editProducts = () => {
    const formData = new FormData()
    formData.append('name',editName)
    formData.append('description',editDescription)
    formData.append('price',editPrice)
    formData.append('slug', 99);
    if(editImage!=null){
      formData.append('product_image',editImage)
    }
    formData.append('_method','put')
    
    editApiPost(`products/${edit_id_num}`,formData, { headers }).then((res)=>{
      console.log(res.data)
      replaceReloadForEdit(res.data)
    }).catch((err)=>console.log(err))
  }

  //cancel edit reload 
  const replaceReloadForEdit =(data)=>{
    const newTasks = tasks.map(task => {
      if (task.id === data.id) {
        return {
          name:data.name,
          description:data.description,
          id:data.id,
          price:data.price,
          image:<img src={`http://localhost:8000/storage/${data.product_image}`} />};
      } else {
        return task;
      }
    });
    setTasks(newTasks);
    getTasks();
  }

  
  //Yes No button 
  function Yes_No_button(id){
    return(<div className='div_of_yes_no'>
    <DoneIcon className={`product_yes_no_icon 
    ${tempEditName==editName&&tempEditDescription==editDescription&&tempEditPrice==editPrice&&editImage==null?'untouch':''} `} onClick={()=>{editProducts();handleChangeClearEditId();handleChangeOpenED();setEditImage(null)}}  />
    <ClearIcon className='product_yes_no_icon' onClick={()=>{handleChangeOpenED();handleChangeClearEditId();setEditImage(null)}}  />
  </div>)
  }

  function EDorYN(id,e){
    return !showED && id==edit_id_num ? Yes_No_button(id) : Edit_delete_button(e);
  }

//tasks to rows
    const editProduct = (e) => {
      return !showED && e.id==edit_id_num ? 
      {
        name:<input type="text" className='product_input' value={editName} onChange={(e)=>{setEditName(e.target.value)}} />
        , 
        id:e.id
        ,
        description:<input type="text" className='product_input' value={editDescription} onChange={(e)=>{setEditDescription(e.target.value)}} />
        , 
        price:<input type="number" className='product_input' value={editPrice} onChange={(e)=>{setEditPrice(e.target.value)}} />
        , 
        product_image:<div>
          {editImage!=null? <img className='selectImg' src={window.URL.createObjectURL(editImage)}/>:''}
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            ref={fileInputRef}
            onChange={(e)=>{setEditImage(e.target.files[0]);setTempEditImage(e.target.files[0])}}
          />
          <DriveFolderUploadIcon 
            onClick={handleIconClick} className='product_image_input' />
        </div>
        , 
        action:<div className='div_of_input_action' >
          {EDorYN(e.id,e)}
        </div>
    }
      :
      {name:e.name, id:e.id, description:e.description, price:e.price, product_image:outputImg(e.product_image), action:
        <div className='div_of_action' >
          {EDorYN(e.id,e)}
        </div>
      };
    }

    useEffect(() => {
      const tempTasks = [...tasks]
      const product = tempTasks.map(e => editProduct(e));
      setTempRows(product);
      setRows(product)
    }, [tasks,showED,showYN,editDescription,editName,editPrice,editImage]);
    
    //sort自带
    useEffect(()=>{
      const temTasks = [...tempTasks]
      temTasks.sort((a, b) => {
        if (order == 'asc') {
          if (a[orderBy] < b[orderBy]) {
            return -1;
          } else if (a[orderBy] > b[orderBy]) {
            return 1;
          }
        } else if(order == 'desc') {
          if (a[orderBy] < b[orderBy]) {
            return 1;
          } else if (a[orderBy] > b[orderBy]) {
            return -1;
          }
        }
        return 0;
      });

      setTasks(temTasks);
      setTempTasks(temTasks);

    }, [order,orderBy])

    //excel
    const excelUpLoad = () => {
      console.log('Excel Up Load')
    };

    const excelDownLoad = () => {
      console.log('Excel Down Load')
    };

    //search input
    const searchProduct = () => {
      let temTasks = [...tempTasks]
      const filteredTasks = temTasks.filter(
        (product) =>
          product.name.includes(search) ||
          product.description.includes(search) ||
          String(product.price).includes(search)
      );
      if(filteredTasks.length==0){
        setTasks([{name:'Sorry',description:'No Products',price:0}]);
      }else{
        setTasks(filteredTasks);
      }
    };

    useEffect(() => {
      if (search !== '') {
        setPage(0);
        searchProduct();
      } else {
        setTasks(tempTasks)
      }
    }, [search]);

    const changePage =()=>{
      setPage(0)
    }

//============================================

  return (
    <Box sx={{ width: '100%' }} className='product_box'>
      {
        token != null ? <Add_Sort_product openRowProductInput={handleChangeShowRowsInputOpen} excelUpLoad={excelUpLoad} excelDownLoad={excelDownLoad} editIdNum={edit_id_num} addInputState={showRowsInput} rows={rows} excelData={excelData} changePage={changePage} />: ''
      }
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            {/* ------- */}
            {showRowsInput ? <TableBody>
              {rowsInput
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="center" 
                      >{row.description}</TableCell>

                      <TableCell align="center"
                      >{row.price}</TableCell>

                      <TableCell align="center" 
                      >{row.product_image}</TableCell>

                      <TableCell align="center" 
                      >{row.action}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> : ''}

            <TableBody>
                {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      sx={{ cursor: 'pointer' }}
                      className={`${showRowsInput?'add_rows_style':''}`}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        className={`${row.id!=edit_id_num && edit_id_num!=null ?'product_table_col':''}`}
                      >
                        {row.name}
                      </TableCell>

                      <TableCell align="center" 
                      className={`${row.id!=edit_id_num && edit_id_num!=null ?'product_table_col':''}`}>{row.description}</TableCell>

                      <TableCell align="center" 
                      className={`${row.id!=edit_id_num && edit_id_num!=null ?'product_table_col':''}`}>{row.price}</TableCell>

                      <TableCell align="center" 
                      className={`${row.id!=edit_id_num && edit_id_num!=null ?'product_table_col':''}`}>{row.product_image}</TableCell>
                      {token != null ? <TableCell 
                      align="center" 
                      className={`${row.id!=edit_id_num && edit_id_num!=null ?'product_table_col':''}`}
                       >{row.action}</TableCell>:null}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody> 
             {/* ------ */}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default EnhancedTable


