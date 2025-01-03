import React, { useState } from 'react'
import Breadcrumb from '../../../components/ui/Breadcrumb'
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';

const Faculties = () => {
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [newFaculty, setNewFaculty] = useState({
        name: '',
        description: ''
    })
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
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingFaculty, setEditingFaculty] = useState(null);

    const handleDeleteFaculty = (id) => {
        setFaculties(faculties.filter(faculty => faculty.id !== id));
    };

    const handleEditFaculty = (faculty) => {
        setEditingFaculty(faculty);
        setNewFaculty({
            name: faculty.name,
            description: faculty.description
        });
        setIsModalOpen(true);
        setIsEditMode(true);
    };

    const handleAddFaculty = () => {
        setIsModalOpen(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Update existing faculty
            setFaculties(faculties.map(faculty =>
                faculty.id === editingFaculty.id
                    ? { ...faculty, ...newFaculty }
                    : faculty
            ));
        } else {
            // Add new faculty
            const id = faculties.length + 1;
            setFaculties([...faculties, { ...newFaculty, id }]);
        }

        // Reset form
        setNewFaculty({ name: '', description: '' });
        setIsModalOpen(false);
        setIsEditMode(false);
        setEditingFaculty(null);
    };

    const handleFacultyClick = (facultyId, facultyName) => {
        navigate(`/dashboard/faculty/${facultyId}/years`, { state: { facultyName } });
    };

    // Update modal title based on mode
    const modalTitle = isEditMode ? 'Edit Faculty' : 'Add New Faculty';
    const submitButtonText = isEditMode ? 'Update Faculty' : 'Add Faculty';

    return (
        <DashboardLayout>
            <main className='bg-gray-50 dark:bg-gray-900 px-3 md:px-8 h-auto min-h-screen'>
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
                                    onClick={() => handleFacultyClick(faculty.id, faculty.name)}
                                    className="mt-4 w-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Manage Years & Modules
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Add Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96">
                            <h2 className="text-xl font-semibold mb-4 dark:text-gray-200">{modalTitle}</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={newFaculty.name}
                                        onChange={(e) => setNewFaculty({ ...newFaculty, name: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Description</label>
                                    <textarea
                                        value={newFaculty.description}
                                        onChange={(e) => setNewFaculty({ ...newFaculty, description: e.target.value })}
                                        className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setIsEditMode(false);
                                            setEditingFaculty(null);
                                            setNewFaculty({ name: '', description: '' });
                                        }}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                    >
                                        {submitButtonText}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </DashboardLayout>
    )
}

export default Faculties
