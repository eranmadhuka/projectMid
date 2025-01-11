import React from 'react';
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../../components/ui/Breadcrumb';

const StudentDashboard = () => {
    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/student/dashboard' }
                    ]}
                />

                {/* Welcome Section */}
                <h1 className='text-customDark font-semibold text-2xl dark:text-gray-300 mt-5'>Dashboard</h1>
                <p className='text-customGray text-sm'>
                    Welcome to the Learning Management Dashboard. Here’s an overview of your progress.
                </p>

                {/* Cards Section */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-6'>
                    {/* Completed Quizzes */}
                    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
                        <h2 className='text-lg font-semibold text-customDark dark:text-gray-300'>Completed Quizzes</h2>
                        <p className='text-4xl font-bold text-blue-600 mt-2'>12</p>
                        <p className='text-sm text-gray-500 mt-1'>You have completed 12 quizzes so far.</p>
                    </div>

                    {/* Active Quizzes */}
                    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
                        <h2 className='text-lg font-semibold text-customDark dark:text-gray-300'>Active Quizzes</h2>
                        <p className='text-4xl font-bold text-green-600 mt-2'>3</p>
                        <p className='text-sm text-gray-500 mt-1'>You have 3 quizzes in progress.</p>
                    </div>

                    {/* Upcoming Exams */}
                    <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'>
                        <h2 className='text-lg font-semibold text-customDark dark:text-gray-300'>Upcoming Exams</h2>
                        <p className='text-4xl font-bold text-red-600 mt-2'>2</p>
                        <p className='text-sm text-gray-500 mt-1'>2 exams are scheduled this week.</p>
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg mt-8 p-6'>
                    <h2 className='text-lg font-semibold text-customDark dark:text-gray-300'>Quick Actions</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mt-4'>
                        {/* Start a Quiz */}
                        <div className='flex flex-col items-center'>
                            <button className='bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg'>
                                Start a Quiz
                            </button>
                            <p className='text-sm text-gray-500 mt-2'>Continue your pending quizzes.</p>
                        </div>

                        {/* View Results */}
                        <div className='flex flex-col items-center'>
                            <button className='bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg'>
                                View Results
                            </button>
                            <p className='text-sm text-gray-500 mt-2'>Check your performance.</p>
                        </div>

                        {/* Access Study Materials */}
                        <div className='flex flex-col items-center'>
                            <button className='bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg'>
                                Study Materials
                            </button>
                            <p className='text-sm text-gray-500 mt-2'>Access additional learning resources.</p>
                        </div>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className='bg-white dark:bg-gray-800 shadow-md rounded-lg mt-8 p-6'>
                    <h2 className='text-lg font-semibold text-customDark dark:text-gray-300'>Recent Activity</h2>
                    <ul className='mt-4'>
                        <li className='flex justify-between items-center border-b py-2'>
                            <span className='text-sm text-gray-700 dark:text-gray-400'>
                                Completed Quiz: <strong>JavaScript Basics</strong>
                            </span>
                            <span className='text-sm text-gray-500'>Score: 85%</span>
                        </li>
                        <li className='flex justify-between items-center border-b py-2'>
                            <span className='text-sm text-gray-700 dark:text-gray-400'>
                                Active Quiz: <strong>React Fundamentals</strong>
                            </span>
                            <span className='text-sm text-gray-500'>Time Remaining: 20 mins</span>
                        </li>
                        <li className='flex justify-between items-center border-b py-2'>
                            <span className='text-sm text-gray-700 dark:text-gray-400'>
                                Upcoming Exam: <strong>Data Structures</strong>
                            </span>
                            <span className='text-sm text-gray-500'>Date: 15th Dec</span>
                        </li>
                    </ul>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
