import React, { useState, useRef, useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import { CSVLink } from "react-csv";
import * as XLSX from 'xlsx';


const New_add_product = ( { openRowProductInput, excelUpLoad, excelDownLoad, editIdNum, addInputState, rows, excelData, changePage } ) => {
  
  const headers = [
    { key: 'name', label: 'Name'},
    {
      key: 'description',
      label: 'Description',
    },
    {
      key: 'price',
      label: 'Price',
    },
    {
      key: 'product_image',
      label: 'Image',
    },
  ];

  //upload Excel-------------
  const fileInputRef = useRef(null);

  const handleIconClick = () => {
    fileInputRef.current.click();
  };

  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryData = event.target.result;
      const workbook = XLSX.read(binaryData, { type: 'binary' });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  useEffect(()=>{
    excelData(data)
  },[data])
  //upload Excel^^^^^^^^^^^^^^^^^^^^^^


  return (
    <div className={`add_sort_totol ${editIdNum ==null?'':'add_up_down'}  ${addInputState ==false?'':'add_up_down'}`}>

        <AddIcon className='product_add_button' onClick={()=>{openRowProductInput();changePage()}}  />

      
        
        {/* ------- */}
        <div className='product_excel_upload_button'>
          <input
            type="file"
            style={{ display: 'none' }}
            // accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          <FileUploadIcon className='product_sort_button' onClick={handleIconClick} />
        </div>
        {/* ------- */}

        <CSVLink data={rows} headers={headers}>
          <DownloadIcon className='product_excel_download_button' />
        </CSVLink>
        
      
    </div>

  )
}

export default New_add_product
