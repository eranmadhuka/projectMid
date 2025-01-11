import React, { useState, useEffect } from 'react';

const ResponsiveTable = ({ title, data, columns }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);

    const filteredData = data.filter((row) =>
        columns.some((column) =>
            row[column.key]?.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handleSearch = (e) => setSearchTerm(e.target.value);
    const handleItemsPerPage = (e) => setItemsPerPage(Number(e.target.value));
    const handlePrevPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Mobile card view render function
    const renderMobileCard = (row) => (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow mb-4 border border-gray-200 dark:border-gray-700">
            {columns.map((column) => (
                <div key={column.key} className="flex flex-col py-2">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                        {column.label}
                    </span>
                    <div className="font-medium text-gray-900 dark:text-white">
                        {column.key === 'avatar' || (typeof row[column.key] === 'string' && row[column.key]?.includes('/uploads/')) ? (
                            <img
                                src={`http://localhost:5000${row[column.key]}`}
                                alt={`${column.label}`}
                                className="w-16 h-16 rounded-full object-cover"
                            />
                        ) : (
                            row[column.key]
                        )}
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="p-4 bg-white dark:bg-gray-800">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearch}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
            </div>

            {/* Desktop view - Hidden on mobile */}
            <div className="hidden md:block overflow-x-auto mt-4">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    className="px-3 py-3 border-b border-gray-200 dark:border-gray-600"
                                >
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {currentData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-600 bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                {columns.map((column) => (
                                    <td key={column.key} className="px-3 py-4 font-medium text-gray-900 dark:text-white">
                                        {column.key === 'avatar' || (typeof row[column.key] === 'string' && row[column.key]?.includes('/uploads/')) ? (
                                            <img
                                                src={`http://localhost:5000${row[column.key]}`}
                                                alt={`${column.label}`}
                                                className="w-10 h-10 rounded-full object-cover"
                                            />
                                        ) : column.key === 'dateOfBirth' ? (
                                            new Date(row[column.key]).toLocaleDateString()
                                        ) : (
                                            row[column.key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile view - Hidden on desktop */}
            <div className="md:hidden mt-4">
                {currentData.map((row, index) => renderMobileCard(row))}
                {currentData.length === 0 && (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No data found
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-4 mt-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center">
                    <label htmlFor="itemsPerPage" className="mr-2 text-sm text-gray-700 dark:text-gray-300">
                        Items per page:
                    </label>
                    <select
                        id="itemsPerPage"
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="p-2 border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                    </select>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto">
                    <button
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                        className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-700 dark:text-gray-300 mx-4">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 text-sm bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:text-white"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResponsiveTable;