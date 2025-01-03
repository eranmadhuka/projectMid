import React from 'react';
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';
import Breadcrumb from '../../components/ui/Breadcrumb';

const Notifications = () => {
    const notifications = [
        {
            title: 'Exam Schedule Released',
            description: 'The semester exam schedule has been released. Check the details in the exam section.',
            date: '2024-12-08',
            status: 'New',
        },
        {
            title: 'Assignment Submission Reminder',
            description: 'Don’t forget to submit your Data Science assignment by 2024-12-15.',
            date: '2024-12-06',
            status: 'Pending',
        },
        {
            title: 'System Maintenance Alert',
            description: 'The LMS system will undergo maintenance on 2024-12-12 from 1:00 AM to 3:00 AM.',
            date: '2024-12-05',
            status: 'Completed',
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
                            { text: 'Notifications', url: '/student/notifications' },
                        ]}
                    />

                    {/* Header */}
                    <h1 className="text-customDark font-semibold text-2xl dark:text-gray-400 mt-5">Notifications</h1>
                    <p className="text-customGray text-sm">
                        Stay updated with the latest announcements and alerts.
                    </p>

                    {/* Notification List */}
                    <div className="mt-6 space-y-4">
                        {notifications.map((notification, index) => (
                            <div
                                key={index}
                                className={`flex justify-between items-start bg-white dark:bg-gray-800 shadow-md rounded-lg p-4 ${notification.status === 'New'
                                    ? 'border-l-4 border-blue-500'
                                    : 'border-l-4 border-gray-300'
                                    }`}
                            >
                                {/* Notification Content */}
                                <div>
                                    <h2 className="text-lg font-semibold text-customDark dark:text-gray-300">
                                        {notification.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {notification.description}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        <span className="font-semibold">Date:</span> {notification.date}
                                    </p>
                                </div>

                                {/* Notification Status */}
                                <span
                                    className={`px-3 py-1 rounded text-sm font-medium ${notification.status === 'New'
                                        ? 'bg-blue-100 text-blue-600'
                                        : notification.status === 'Pending'
                                            ? 'bg-yellow-100 text-yellow-600'
                                            : 'bg-gray-100 text-gray-600'
                                        }`}
                                >
                                    {notification.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default Notifications;
