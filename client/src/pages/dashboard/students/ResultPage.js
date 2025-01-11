import React from 'react';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const ResultPage = () => {
    const results = [
        {
            quizName: 'JavaScript Basics',
            score: '85%',
            status: 'Passed',
            date: '2024-12-10',
        },
        {
            quizName: 'React Fundamentals',
            score: '70%',
            status: 'Passed',
            date: '2024-12-05',
        },
        {
            quizName: 'Data Structures',
            score: '55%',
            status: 'Failed',
            date: '2024-11-30',
        },
    ];

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/student/dashboard' },
                        { text: 'Results', url: '/student/results' },
                    ]}
                />

                {/* Header */}
                <h1 className="text-customDark font-semibold text-2xl dark:text-gray-300 mt-5">Results</h1>
                <p className="text-customGray text-sm">
                    View your performance and quiz results below.
                </p>

                {/* Results Table */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6 p-6">
                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                        Quiz Results
                    </h2>
                    <table className="w-full mt-4 border-collapse">
                        <thead>
                            <tr className="bg-gray-200 dark:bg-gray-700 text-left text-gray-700 dark:text-gray-300">
                                <th className="py-2 px-4">Quiz Name</th>
                                <th className="py-2 px-4">Score</th>
                                <th className="py-2 px-4">Status</th>
                                <th className="py-2 px-4">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {results.map((result, index) => (
                                <tr
                                    key={index}
                                    className={`border-b dark:border-gray-700 ${result.status === 'Failed'
                                        ? 'bg-red-50 dark:bg-red-900'
                                        : 'bg-green-50 dark:bg-green-900'
                                        }`}
                                >
                                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                                        {result.quizName}
                                    </td>
                                    <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
                                        {result.score}
                                    </td>
                                    <td
                                        className={`py-2 px-4 font-semibold ${result.status === 'Failed'
                                            ? 'text-red-600 dark:text-red-400'
                                            : 'text-green-600 dark:text-green-400'
                                            }`}
                                    >
                                        {result.status}
                                    </td>
                                    <td className="py-2 px-4 text-gray-500 dark:text-gray-400">
                                        {result.date}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Performance Summary */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6 p-6">
                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                        Performance Summary
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                        {/* Total Quizzes */}
                        <div className="flex flex-col items-center">
                            <p className="text-4xl font-bold text-blue-600">3</p>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">
                                Total Quizzes Attempted
                            </p>
                        </div>

                        {/* Passed Quizzes */}
                        <div className="flex flex-col items-center">
                            <p className="text-4xl font-bold text-green-600">2</p>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">
                                Quizzes Passed
                            </p>
                        </div>

                        {/* Average Score */}
                        <div className="flex flex-col items-center">
                            <p className="text-4xl font-bold text-purple-600">70%</p>
                            <p className="text-gray-700 dark:text-gray-400 mt-2">
                                Average Score
                            </p>
                        </div>
                    </div>
                </div>

                {/* Download Certificate Section */}
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg mt-6 p-6 text-center">
                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                        Certificates
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Download certificates for completed quizzes or courses.
                    </p>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg">
                        Download Certificates
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default ResultPage;
