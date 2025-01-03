import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Breadcrumb from '../../../components/ui/Breadcrumb'
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';

const FacultyYearManager = () => {
    const location = useLocation();
    const facultyName = location.state?.facultyName || 'Faculty';
    const { facultyId } = useParams();
    const [selectedYear, setSelectedYear] = useState(null);
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];
    const [modules, setModules] = useState([
        { id: 1, name: 'Module 1', code: 'IT2030', year: 'Year 1' },
        { id: 2, name: 'Module 2', code: 'IT2031', year: 'Year 1' },
        // Add more modules as needed
    ]);

    // Add new states for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [currentModule, setCurrentModule] = useState({
        name: '',
        code: '',
        year: ''
    });

    const handleAddModule = (year) => {
        setIsEditMode(false);
        setCurrentModule({ name: '', code: '', year });
        setIsModalOpen(true);
    };

    const handleEditModule = (module) => {
        setIsEditMode(true);
        setCurrentModule(module);
        setIsModalOpen(true);
        console.log(module);

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEditMode) {
            // Update existing module
            setModules(modules.map(module =>
                module.id === currentModule.id ? currentModule : module
            ));
        } else {
            // Add new module
            const newModule = {
                ...currentModule,
                id: modules.length + 1
            };
            setModules([...modules, newModule]);
        }
        setIsModalOpen(false);
        setCurrentModule({ name: '', code: '', year: '' });
    };

    const handleDeleteModule = (moduleId) => {
        setModules(modules.filter(module => module.id !== moduleId));
    };

    return (
        <DashboardLayout>
            <main className='bg-gray-50 dark:bg-gray-900 px-3 md:px-8 h-auto min-h-screen'>
                <div className='px-10 pt-5 sm:px-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Faculties', url: '/dashboard/faculties' },
                            { text: facultyName }
                        ]}
                    />

                    <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 my-6">
                        {facultyName} Faculty
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-6">
                        {/* Years sidebar */}
                        <div className="md:col-span-1 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                Academic Years
                            </h2>
                            <div className="space-y-2">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => setSelectedYear(year)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                        ${selectedYear === year
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Modules section */}
                        <div className="md:col-span-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    {selectedYear ? `Modules - ${selectedYear}` : 'Select a year'}
                                </h2>
                                {selectedYear && (
                                    <button
                                        onClick={() => handleAddModule(selectedYear)}
                                        className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700
                                        text-white px-4 py-2 rounded-lg transition-colors duration-200"
                                    >
                                        Add Module
                                    </button>
                                )}
                            </div>

                            {selectedYear && (
                                <div className="space-y-4">
                                    {modules
                                        .filter(module => module.year === selectedYear)
                                        .map(module => (
                                            <div
                                                key={module.id}
                                                className="border dark:border-gray-700 p-4 rounded-lg
                                                bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750
                                                transition-colors duration-200"
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
                                                            {module.name}
                                                        </h3>
                                                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                                                            {module.code}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-3">
                                                        <button
                                                            onClick={() => handleEditModule(module)}
                                                            className="text-blue-600 hover:text-blue-700 
                                                            dark:text-blue-500 dark:hover:text-blue-400
                                                            transition-colors duration-200"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteModule(module.id)}
                                                            className="text-red-600 hover:text-red-700
                                                            dark:text-red-500 dark:hover:text-red-400
                                                            transition-colors duration-200"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Add Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 shadow-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                {isEditMode ? 'Edit Module' : 'Add New Module'}
                            </h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                                        Module Name
                                    </label>
                                    <input
                                        type="text"
                                        value={currentModule.name}
                                        onChange={(e) => setCurrentModule({
                                            ...currentModule,
                                            name: e.target.value
                                        })}
                                        className="w-full p-2.5 rounded-lg border border-gray-300 
                                        dark:border-gray-600 dark:bg-gray-700 
                                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                                        text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                                        Module Code
                                    </label>
                                    <input
                                        type="text"
                                        value={currentModule.code}
                                        onChange={(e) => setCurrentModule({
                                            ...currentModule,
                                            code: e.target.value
                                        })}
                                        className="w-full p-2.5 rounded-lg border border-gray-300 
                                        dark:border-gray-600 dark:bg-gray-700 
                                        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                                        text-gray-900 dark:text-white"
                                        required
                                    />
                                </div>
                                <div className="flex justify-end gap-2 mt-6">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsModalOpen(false);
                                            setCurrentModule({ name: '', code: '', year: '' });
                                        }}
                                        className="px-4 py-2 rounded-lg
                                        text-gray-500 dark:text-gray-400 
                                        hover:bg-gray-100 dark:hover:bg-gray-700
                                        transition-colors duration-200"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 rounded-lg
                                        bg-blue-600 hover:bg-blue-700 
                                        dark:bg-blue-600 dark:hover:bg-blue-700
                                        text-white font-medium
                                        transition-colors duration-200"
                                    >
                                        {isEditMode ? 'Update Module' : 'Add Module'}
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

export default FacultyYearManager