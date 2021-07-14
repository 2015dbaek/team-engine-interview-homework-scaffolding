import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { COLUMNS } from './columns'
import './table.css'

export const BasicTable = (props: { elist: any }) => {

    const columns = useMemo(() => COLUMNS, []) //data won't be created on render with useMemo
    const data = useMemo(() => props.elist, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: columns,
        data: data
    },
    useSortBy)

    return(
        <div>
            <table {...getTableProps()}>
              <thead>
                  {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                {column.render('Header')}
                                <span>
                                    {column.isSorted ? (column.isSortedDesc ? '▼' : '▲') : ''}
                                </span>

                                </th>
                    ))}   
                </tr>
                ))}
              </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}