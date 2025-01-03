import React from 'react'
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout'
import Breadcrumb from '../../../components/ui/Breadcrumb'
import StatusCard from '../../../components/Dashboard/ui/StatusCard'
import EarningsBarChart from '../../../components/Dashboard/EarningsBarChart'
// import PieChart from '../../../components/Dashboard/PieChart'
import RecentNotification from '../../../components/Dashboard/RecentNotification'

const Dashboard = () => {
    return (
        <DashboardLayout>
            <main className="bg-gray-50 dark:bg-gray-900 px-4 md:px-8 min-h-screen">
                <div className="pt-5 md:px-10">
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/' }
                        ]}
                    />
                    <h1 className='text-customDark font-semibold text-2xl dark:text-gray-400 mt-5'>Dashboard</h1>
                    <p className='text-customGray text-sm'>Welcome to Learning Management Dashboard.</p>

                    {/* Status Cards */}
                    <div className="grid gap-6 my-8 md:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            text="Total Students"
                            value="1,234"
                            color={{ light: 'orange-100', dark: 'orange-500' }}
                        />
                        <StatusCard
                            text="Active Courses"
                            value="45"
                            color={{ light: 'green-100', dark: 'green-500' }}
                        />
                        <StatusCard
                            text="Total Questions"
                            value="452"
                            color={{ light: 'blue-100', dark: 'blue-500' }}
                        />
                        <StatusCard
                            text="Completion Rate"
                            value="87%"
                            color={{ light: 'teal-100', dark: 'teal-500' }}
                        />
                    </div>

                    {/* Charts Section */}
                    <div className='grid gap-6 xl:grid-cols-2 2xl:grid-cols-3'>
                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Earnings Overview</h3>
                            <EarningsBarChart />
                        </div>

                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            <RecentNotification />
                        </div>
                    </div>

                    {/* New Cards Section */}
                    <div className='my-6 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-2'>
                        {/* Top Categories Card */}
                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Categories</h3>
                                <button className='text-customBlue font-medium text-sm hover:underline'>View All</button>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Web Development</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">2,345</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Data Science</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">1,834</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Mobile Development</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">1,520</span>
                                </li>
                            </ul>
                        </div>

                        {/* Top Instructors Card */}
                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Instructors</h3>
                                <a href="#" className='text-customBlue font-medium text-sm hover:underline'>View All</a>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/avatar1.jpg" alt="Instructor" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">John Smith</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">4.9 ★ (2.5k reviews)</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/avatar2.jpg" alt="Instructor" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">4.8 ★ (1.8k reviews)</p>
                                    </div>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/avatar3.jpg" alt="Instructor" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Mike Wilson</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">4.7 ★ (1.2k reviews)</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        {/* Support Requests Card */}
                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Support Requests</h3>
                                <a href="#" className='text-customBlue font-medium text-sm hover:underline'>View All</a>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Technical Issues</p>
                                        <span className="text-xs text-orange-500">12 pending</span>
                                    </div>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full dark:bg-orange-900 dark:text-orange-300">High</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Account Access</p>
                                        <span className="text-xs text-blue-500">8 pending</span>
                                    </div>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full dark:bg-blue-900 dark:text-blue-300">Medium</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">Billing Issues</p>
                                        <span className="text-xs text-green-500">3 pending</span>
                                    </div>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full dark:bg-green-900 dark:text-green-300">Low</span>
                                </li>
                            </ul>
                        </div>

                        {/* Top Students Card */}
                        <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            <div className='flex items-center justify-between mb-4'>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Students</h3>
                                <a href="#" className='text-customBlue font-medium text-sm hover:underline'>View All</a>
                            </div>
                            <ul className="space-y-3">
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/student1.jpg" alt="Student" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Alex Thompson</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">15 courses completed</p>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">98%</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/student2.jpg" alt="Student" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">Emma Davis</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">12 courses completed</p>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">95%</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <img className="w-8 h-8 rounded-full" src="/student3.jpg" alt="Student" />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">James Brown</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">10 courses completed</p>
                                    </div>
                                    <span className="text-sm font-medium text-green-600">92%</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    )
}

export default Dashboard
