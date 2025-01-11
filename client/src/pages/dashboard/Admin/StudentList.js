import React, { useMemo, useState, useEffect } from 'react';
import { DateTime } from 'luxon';
import axios from 'axios';
import Table from '../../../components/Dashboard/ui/Table';
import Breadcrumb from '../../../components/ui/Breadcrumb';
import Modal from '../../../components/Modal';
import ViewProfile from '../../../components/Dashboard/profile/ViewProfile';
import EditProfile from '../../../components/Dashboard/profile/EditProfile';

import { RiEdit2Fill } from 'react-icons/ri';
import { MdDeleteForever } from 'react-icons/md';
import { FaRegEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';

const StudentList = () => {
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState(null);

    const handleViewProfile = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    };

    const handleEditProfile = (profile) => {
        setSelectedProfile(profile);
        setIsEditModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setIsEditModalOpen(false);
        setSelectedProfile(null);
    };

    // Fetch data from the API when the component mounts
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/students/students');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            header: 'ID',
            accessorKey: 'studentId',
            footer: 'ID',
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            footer: 'Avatar',
            cell: (info) => (
                <img
                    src={`http://localhost:5000${info.getValue()}`}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                    onError={(e) => {
                        e.target.src = '/default-avatar.png'; // Fallback image
                    }}
                />
            ),
        },
        {
            header: 'Name',
            accessorFn: (row) => `${row.firstName} ${row.lastName}`,
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email',
        },
        {
            header: 'Phone',
            accessorKey: 'phone',
            footer: 'Phone',
        },
        {
            header: 'Gender',
            accessorKey: 'gender',
            footer: 'Gender',
        },
        {
            header: 'DOB',
            accessorKey: 'dateOfBirth',
            footer: 'DOB',
            cell: (info) => {
                const date = DateTime.fromISO(info.getValue());
                return (
                    <span>
                        {date.isValid ? date.toLocaleString(DateTime.DATE_MED) : 'Invalid Date'}
                    </span>
                );
            },
        },
        {
            header: 'Registration Date',
            accessorKey: 'createdAt',
            footer: 'Registration Date',
            cell: (info) => {
                const date = DateTime.fromISO(info.getValue());
                return (
                    <span>
                        {date.isValid ? date.toLocaleString(DateTime.DATETIME_MED) : 'Invalid Date'}
                    </span>
                );
            },
        },
        {
            header: 'Status',
            accessorKey: 'status',
            footer: 'Status',
            cell: info => {
                <span className={` ${info.getValue() ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800  dark:bg-red-900 dark:text-red-300'} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
                    {info.getValue() === true ? 'Active' : 'Inactive'}
                </span>
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            footer: 'Actions',
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        key="view-button"
                        onClick={() => handleViewProfile(info.row.original)}
                        className="bg-gray-200 hover:bg-green-700 text-gray-500 hover:text-gray-100 font-bold p-2 rounded"
                    >
                        <FaRegEye />
                    </button>
                    <button
                        key="edit-button"
                        onClick={() => handleEditProfile(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/dashboard' },
                        { text: 'Students List', url: '/dashboard/students/list' },
                    ]}
                />

                <div>
                    <h1 className="text-customDark font-semibold text-2xl dark:text-gray-300 mt-5">
                        Students
                    </h1>
                    <p className="text-customGray text-sm">Manage Students.</p>
                </div>

                <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                    <Table
                        data={data}
                        columns={columns}
                        title="Students List"
                        placeholder="Search Students"
                    />
                </div>

                {/* View Profile Modal */}
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    {selectedStudent && (
                        <ViewProfile
                            isOpen={isModalOpen}
                            onClose={handleCloseModal}
                            student={selectedStudent}
                        />
                    )}
                </Modal>

                {/* Edit Profile Modal */}
                <Modal key="edit-profile-modal" isOpen={isEditModalOpen} onClose={handleCloseModal}>
                    {selectedProfile && (
                        <EditProfile
                            isOpen={isEditModalOpen}
                            onClose={handleCloseModal}
                            student={selectedStudent}
                            onSave={(updatedData) => {
                                console.log('Updated Data:', updatedData);
                                // Call API to save changes
                                handleCloseModal();
                            }}
                        />
                    )}
                </Modal>
            </div>
        </DashboardLayout>
    );
};

export default StudentList;