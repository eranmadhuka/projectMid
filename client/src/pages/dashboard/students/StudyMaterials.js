import React from 'react';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const StudyMaterials = () => {
    const studyMaterials = [
        {
            title: 'Introduction to JavaScript',
            description: 'Learn the basics of JavaScript with this comprehensive guide.',
            subject: 'JavaScript',
            dateAdded: '2024-12-05',
            downloadLink: '/materials/javascript-basics.pdf',
        },
        {
            title: 'React Hooks Overview',
            description: 'Detailed notes on React Hooks and their usage.',
            subject: 'React',
            dateAdded: '2024-12-02',
            downloadLink: '/materials/react-hooks.pdf',
        },
        {
            title: 'Data Structures: Arrays',
            description: 'Understand arrays and their applications in data structures.',
            subject: 'Data Structures',
            dateAdded: '2024-11-30',
            downloadLink: '/materials/arrays.pdf',
        },
    ];

    return (
        <DashboardLayout>
            <main className='bg-gray-50 dark:bg-gray-900 px-3 md:px-8 h-auto min-h-screen'>
                <div className="px-10 pt-5">
                    {/* Breadcrumb */}
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/student/dashboard' },
                            { text: 'Study Materials', url: '/student/study-materials' },
                        ]}
                    />

                    {/* Header */}
                    <h1 className="text-customDark font-semibold text-2xl dark:text-gray-400 mt-5">Study Materials</h1>
                    <p className="text-customGray text-sm">
                        Access and download study materials for various topics and subjects.
                    </p>

                    {/* Materials List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                        {studyMaterials.map((material, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 flex flex-col justify-between"
                            >
                                {/* Title and Description */}
                                <div>
                                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                                        {material.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {material.description}
                                    </p>
                                </div>

                                {/* Additional Info and Download */}
                                <div className="mt-4">
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Subject:</span> {material.subject}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Date Added:</span> {material.dateAdded}
                                    </p>
                                    <a
                                        href={material.downloadLink}
                                        download
                                        className="mt-3 inline-block text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm px-4 py-2 rounded-lg"
                                    >
                                        Download
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default StudyMaterials;
