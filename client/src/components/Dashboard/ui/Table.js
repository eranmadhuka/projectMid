import React, { useState } from 'react'

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Link } from 'react-router-dom'


const Table = ({ data, columns, title, buttonLink, buttonTxt }) => {
    const [sorting, setSorting] = useState([])
    const [filtering, setFiltering] = useState('')

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting: sorting,
            globalFilter: filtering,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setFiltering,
    })

    return (
        <>
            <div className="relative overflow-x-auto">

                <div className='flex items-center justify-between'>
                    <h2 className='text-xl text-customDark dark:text-gray-200'>{title}</h2>
                    <div className='flex items-center justify-end space-x-3 my-3'>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>
                            <input
                                type="search"
                                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Search Student"
                                value={filtering}
                                onChange={(e) => setFiltering(e.target.value)}
                            />
                        </div>

                        {/* <Link
                            to={buttonLink}
                            className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
                        >{buttonTxt}</Link> */}

                    </div>
                </div>
                <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
                    <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                        onClick={header.column.getToggleSortingHandler()}
                                        className='px-6 py-3'
                                    >
                                        {header.isPlaceholder ? null : (
                                            <div>
                                                {flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                                {
                                                    { asc: '🔼', desc: '🔽' }[
                                                    header.column.getIsSorted() ?? null
                                                    ]
                                                }
                                            </div>
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows.map((row) => (
                            <tr
                                key={row.id}
                                className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td
                                        key={cell.id}
                                        className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                                    >
                                        {cell.column.columnDef.accessorKey === 'avatar' ? (
                                            <div className='w-14 h-14'>
                                                <img
                                                    src={cell.getValue()} // Assuming 'cell.value' contains the image URL
                                                    alt='avatar'
                                                    className='w-full h-full object-cover rounded-full'
                                                />
                                            </div>
                                        ) : (
                                            <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                                        )}


                                        {cell.column.columnDef.accessorKey === 'status' && (
                                            <span className={` ${cell.getValue() ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800  dark:bg-red-900 dark:text-red-300'} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
                                                {cell.getValue() === true ? 'Active' : 'Inactive'}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}

                    </tbody>
                    {/* <tfoot>
                        {table.getHeaderGroups().map(footerGroup => (
                            <tr key={footerGroup.id}>
                                {footerGroup.headers.map(header => (
                                    <th
                                        key={header.id}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </tfoot> */}
                </table>

                {/* Pagination */}
                <div className='flex items-center justify-between my-3'>
                    <nav>
                        <ul class="flex items-center space-x-px h-8 text-sm ">
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => table.setPageIndex(0)}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    {'<<'}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    {'<'}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    {'>'}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                    disabled={!table.getCanNextPage()}
                                >
                                    {'>>'}
                                </button>
                            </li>
                            <li>
                                <div className='flex space-x-3 ms-5 text-customDark dark:text-gray-400'>
                                    <span className="flex items-center gap-1">
                                        <div>Page</div>
                                        <strong>
                                            {table.getState().pagination.pageIndex + 1} of{' '}
                                            {table.getPageCount()}
                                        </strong>
                                    </span>
                                    <span className="flex items-center gap-1">
                                        | Go to page:
                                        <input
                                            type="number"
                                            defaultValue={table.getState().pagination.pageIndex + 1}
                                            onChange={e => {
                                                const page = e.target.value ? Number(e.target.value) - 1 : 0
                                                table.setPageIndex(page)
                                            }}
                                            className="p-2 ps-2 w-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        />
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    <div>
                        <select
                            value={table.getState().pagination.pageSize}
                            onChange={e => {
                                table.setPageSize(Number(e.target.value))
                            }}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        >
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <option key={pageSize} value={pageSize}>
                                    <span className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Show</span> {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Table
