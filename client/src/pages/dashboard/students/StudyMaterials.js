import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';
const API_URL = process.env.REACT_APP_API_URL;

const StudyMaterials = () => {
    const [studyMaterials, setStudyMaterials] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudyMaterials = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/study-materials`);
                setStudyMaterials(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchStudyMaterials();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <DashboardLayout>
            <div>
                {/* Breadcrumb */}
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/student/dashboard' },
                        { text: 'Study Materials', url: '/student/study-materials' },
                    ]}
                />

                {/* Header */}
                <h1 className="text-customDark font-semibold text-2xl dark:text-gray-300 mt-5">Study Materials</h1>
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
                                    <span className="font-semibold">Module:</span> {material.module}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-semibold">Date Added:</span> {material.createdAt}
                                </p>
                                <a
                                    href={`${API_URL}/uploads/studyMaterials/${material.file}`}
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
        </DashboardLayout>
    );
};

export default StudyMaterials;