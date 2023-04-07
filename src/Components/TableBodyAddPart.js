import React from 'react'
import TableBody from '@mui/material/TableBody';

const TableBodyAddPart = ( { rows, page, rowsPerPage, TableRow, handleClick, showRowsInput, TableCell, edit_id_num, emptyRows, token, rowsInput } ) => {
  return (
    <TableBody>
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
        <TableRow>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}

export default TableBodyAddPart
