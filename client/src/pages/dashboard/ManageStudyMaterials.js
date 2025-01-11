import React, { useState } from 'react';
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../components/ui/Breadcrumb';
import { MdEdit } from 'react-icons/md';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from 'react-icons/md';
import Table from '../../components/Dashboard/ui/Table';
import { Link } from 'react-router-dom';
import { DateTime } from 'luxon';

const ManageStudyMaterials = ({ role }) => {
    const [studyMaterials, setStudyMaterials] = useState([
        {
            id: 1,
            title: 'Introduction to JavaScript',
            description: 'Learn the basics of JavaScript with this comprehensive guide.',
            subject: 'JavaScript',
            dateAdded: '2024-12-05',
            downloadLink: '/materials/javascript-basics.pdf',
        },
        {
            id: 2,
            title: 'React Hooks Overview',
            description: 'Detailed notes on React Hooks and their usage.',
            subject: 'React',
            dateAdded: '2024-12-02',
            downloadLink: '/materials/react-hooks.pdf',
        },
        {
            id: 3,
            title: 'Data Structures: Arrays',
            description: 'Understand arrays and their applications in data structures.',
            subject: 'Data Structures',
            dateAdded: '2024-11-30',
            downloadLink: '/materials/arrays.pdf',
        },
        {
            id: 4,
            title: 'React Hooks Overview',
            description: 'Detailed notes on React Hooks and their usage.',
            subject: 'React',
            dateAdded: '2024-12-02',
            downloadLink: '/materials/react-hooks.pdf',
        },
    ]);

    const columns = [
        {
            header: 'Title',
            accessorKey: 'title',
            footer: 'Title',
        },
        {
            header: 'Description',
            accessorKey: 'description',
            footer: 'Description',
        },
        {
            header: 'Subject',
            accessorKey: 'subject',
            footer: 'Subject',
        },
        {
            header: 'Date Added',
            accessorKey: 'dateAdded',
            footer: 'Date Added',
            cell: (info) => {
                const formattedDate = DateTime.fromISO(info.getValue()).toLocaleString(DateTime.DATE_MED);
                return <span>{formattedDate}</span>;
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            footer: 'Actions',
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEdit(info.row.id)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdEdit />
                    </button>
                    <button
                        onClick={() => handleDelete(info.row.original.id)}
                        className="bg-gray-200 hover:bg-red-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            ),
        },
    ];

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        dateAdded: '',
        downloadLink: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setStudyMaterials([...studyMaterials, formData]);
        resetForm();
        setIsModalOpen(false);
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            subject: '',
            dateAdded: '',
            downloadLink: '',
        });
    };

    const handleDelete = (index) => {
        const updatedMaterials = studyMaterials.filter((material) => material.id !== index);
        setStudyMaterials(updatedMaterials);
    };

    const handleEdit = (index) => {
        const materialToEdit = studyMaterials[index];
        setFormData(materialToEdit);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        resetForm();
    };

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: `/${role}/dashboard` },
                        { text: 'Manage Study Materials', url: `/${role}/study-materials` },
                    ]}
                />
                <div className="flex items-center justify-between mt-5 flex-wrap">
                    <h1 className="text-xl font-semibold dark:text-gray-300">Manage Study Materials</h1>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Add Material
                    </button>
                </div>

                {/* Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-11/12 sm:w-3/4 lg:w-1/2">
                            <h2 className="text-lg font-semibold dark:text-gray-200">Add/Edit Material</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        Description
                                    </label>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) =>
                                            setFormData({ ...formData, description: e.target.value })
                                        }
                                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    ></textarea>
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.subject}
                                        onChange={(e) =>
                                            setFormData({ ...formData, subject: e.target.value })
                                        }
                                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        Date Added
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.dateAdded}
                                        onChange={(e) =>
                                            setFormData({ ...formData, dateAdded: e.target.value })
                                        }
                                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="mt-4">
                                    <label className="block text-sm font-medium dark:text-gray-300">
                                        Download Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.downloadLink}
                                        onChange={(e) =>
                                            setFormData({ ...formData, downloadLink: e.target.value })
                                        }
                                        className="mt-1 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                </div>
                                <div className="mt-6 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Table */}
                <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800">
                    {/* Responsive Table */}
                    <div className="overflow-x-auto">
                        <Table
                            data={studyMaterials}
                            columns={columns}
                            title="Study Materials List"
                            buttonTxt="+ Add Material"
                            buttonLink="/dashboard/students/add"
                            className="min-w-full"
                        />
                    </div>
                </div>
            </div>
        </DashboardLayout >
    );
};

export default ManageStudyMaterials;
