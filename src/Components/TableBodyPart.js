import React from 'react';
import TableBody from '@mui/material/TableBody';


const TableBodyComponent = ({ rows, page, rowsPerPage, TableRow, handleClick, showRowsInput, TableCell, edit_id_num, emptyRows, token }) => {
  return (
    
    <TableBody>
      {Array.isArray(rows) &&
        rows
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
                className={`${showRowsInput ? 'add_rows_style' : ''}`}
              >
                <TableCell
                  component="th"
                  id={labelId}
                  scope="row"
                  padding="none"
                  className={`${row.id != edit_id_num && edit_id_num != null ? 'product_table_col' : ''}`}
                >
                  {row.name}
                </TableCell>

                <TableCell
                  align="center"
                  className={`${row.id != edit_id_num && edit_id_num != null ? 'product_table_col' : ''}`}
                >
                  {row.description}
                </TableCell>

                <TableCell
                  align="center"
                  className={`${row.id != edit_id_num && edit_id_num != null ? 'product_table_col' : ''}`}
                >
                  {row.price}
                </TableCell>

                <TableCell
                  align="center"
                  className={`${row.id != edit_id_num && edit_id_num != null ? 'product_table_col' : ''}`}
                >
                  {row.product_image}
                </TableCell>
                {token != null ? (
                  <TableCell
                    align="center"
                    className={`${row.id != edit_id_num && edit_id_num != null ? 'product_table_col' : ''}`}
                  >
                    {row.action}
                  </TableCell>
                ) : null}
              </TableRow>
            );
          })}
      {emptyRows > 0 && (
        <TableRow>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  );
};

export default TableBodyComponent;
