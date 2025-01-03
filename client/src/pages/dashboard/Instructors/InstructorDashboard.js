import React from 'react'
import Breadcrumb from '../../../components/ui/Breadcrumb'
import StatusCard from '../../../components/Dashboard/ui/StatusCard'
import EarningsBarChart from '../../../components/Dashboard/EarningsBarChart'
import RecentNotification from '../../../components/Dashboard/RecentNotification'
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout'

const InstructorDashboard = () => {
    return (
        <DashboardLayout>
            <main className='bg-gray-100 px-3 md:px-8 h-auto dark:bg-gray-900'>
                <div className='px-10 pt-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/instructor' }
                        ]}
                    />

                    <h1 className='text-customDark font-semibold text-2xl dark:text-gray-400 mt-5'>Dashboard</h1>
                    <p className='text-customGray text-sm'>Welcome to Learning Management Dashboard.</p>

                    {/* Cards */}
                    <div className="grid gap-6 my-8 md:grid-cols-2 xl:grid-cols-4">
                        <StatusCard
                            text="Total Questions"
                            value="452"
                            color={{ light: 'orange-100', dark: 'orange-500' }}
                        />
                        <StatusCard
                            text="Total Questions"
                            value="452"
                            color={{ light: 'green-100', dark: 'green-500' }}
                        />
                        <StatusCard
                            text="Total Questions"
                            value="452"
                            color={{ light: 'blue-100', dark: 'blue-500' }}
                        />
                        <StatusCard
                            text="Total Questions"
                            value="452"
                            color={{ light: 'teal-100', dark: 'teal-500' }}
                        />
                    </div>

                    <div className='grid gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
                        <div className='relative p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                            <div>
                                {/* Barchart */}
                                <EarningsBarChart />
                            </div>
                        </div>

                        <div className='relative p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            {/* Notification Card */}
                            <RecentNotification />
                        </div>
                    </div>

                </div>
            </main>
        </DashboardLayout>
    )
}

export default InstructorDashboard
