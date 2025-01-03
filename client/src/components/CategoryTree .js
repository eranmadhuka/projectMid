import React from 'react';

import { IoIosAddCircle } from 'react-icons/io';
import { MdEdit, MdDeleteForever } from 'react-icons/md';

import categories from '../CATEGORIES.json';

const CategoryTree = ({ handleDelete, handleUpdate, handleAdd }) => {
    const renderCategories = (categories) => {
        return (
            <ul className="pl-4">
                {categories.map((category) => (
                    <li
                        key={category.id}
                        className="border p-3 my-5 rounded-md bg-white shadow-md"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <span>{category.name}</span>
                            </div>
                            <div>
                                <button
                                    className="text-customGray mr-2 text-xl"
                                    onClick={() => handleUpdate(category.id)}
                                >
                                    <MdEdit />
                                </button>
                                <button
                                    className="text-customGray mr-2 text-xl"
                                    onClick={() => handleDelete(category.id)}
                                >
                                    <MdDeleteForever />
                                </button>
                                <button
                                    className="text-customGray mr-2 text-xl"
                                    onClick={() => handleAdd(category.id)}
                                >
                                    <IoIosAddCircle />
                                </button>
                            </div>
                        </div>
                        {category.children && renderCategories(category.children)}
                    </li>
                ))}
            </ul>
        );
    };

    return <div>{renderCategories(categories)}</div>;
};

export default CategoryTree;
