import React from 'react'

const AddProductInRow = () => {

  function test() {
    rows.push({
      title:<input type="text" className='product_input' />,
      id:<input type="text" className='product_input' />,
      description:<input type="text" className='product_input' />,
      price:<input type="number" className='product_input' />,
      product_image:
      <div>
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
        <DriveFolderUploadIcon 
          onClick={handleIconClick} className='product_image_input' />
      </div>,
      action:
      <div className='div_of_edit_delete'>
        <DoneIcon className='product_yes_no_icon' />
        <ClearIcon className='product_yes_no_icon' />
      </div>
      })
  }
  
  test();


  return (
    <div>
      
    </div>
  )
}

export default AddProductInRow
