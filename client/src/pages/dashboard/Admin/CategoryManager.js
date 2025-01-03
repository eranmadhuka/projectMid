import React, { useState } from 'react'
import Breadcrumb from '../../../components/ui/Breadcrumb'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';

const CategoryManager = () => {
    const navigate = useNavigate();
    const [faculties, setFaculties] = useState([
        {
            id: 1,
            name: 'Computing',
            description: 'School of Computing and Information Technology',
        },
        {
            id: 2,
            name: 'Business',
            description: 'School of Business and Management',
        },
    ]);

    const handleDeleteFaculty = (id) => {
        setFaculties(faculties.filter(faculty => faculty.id !== id));
    };

    const handleEditFaculty = (faculty) => {
        // Implement edit logic
    };

    const handleAddFaculty = () => {
        // Implement add logic
    };

    const handleFacultyClick = (facultyId) => {
        navigate(`/dashboard/faculty/${facultyId}/years`);
    };

    return (
        <DashboardLayout>
            <main className='bg-gray-50 px-3 md:px-8 h-auto dark:bg-gray-900'>
                <div className='px-10 pt-5 sm:px-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Faculties' }
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className='text-gray-800 font-semibold text-2xl dark:text-gray-200 mt-5'>Faculty Management</h1>
                        <button
                            onClick={handleAddFaculty}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        >
                            Add Faculty
                        </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 my-5">
                        {faculties.map((faculty) => (
                            <div
                                key={faculty.id}
                                className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                        {faculty.name}
                                    </h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEditFaculty(faculty)}
                                            className="text-blue-600 hover:text-blue-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteFaculty(faculty.id)}
                                            className="text-red-600 hover:text-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 mt-2">
                                    {faculty.description}
                                </p>
                                <button
                                    onClick={() => handleFacultyClick(faculty.id)}
                                    className="mt-4 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Manage Years & Modules
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    )
}

export default CategoryManager