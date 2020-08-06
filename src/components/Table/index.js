import React from 'react';
import { useTable } from 'react-table';

const Table = ({ columns, data, headerStyle, rowStyle }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data});

    // console.log(`DATA :: ${JSON.stringify(data)}`);

    return (
        <table {...getTableProps()} style={ { paddingTop: 20, paddingBottom: 10, width: '100%' }}>
          <thead style={ headerStyle }>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} >
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    // console.log('cell.render("Cell") :: ', JSON.stringify(cell.getCellProps()));
                    return <td {...cell.getCellProps()}  style={ rowStyle } >{cell.render("Cell")}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      );
};

export default Table;