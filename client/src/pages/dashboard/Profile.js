import React from 'react';
import { useParams } from 'react-router-dom';

import UserProfileCard from '../../components/Dashboard/UserProfileCard'
import UserProfileTabs from '../../components/Dashboard/UserProfileTabs'
import Breadcrumb from '../../components/ui/Breadcrumb'

import mockUserData from '../../MOCK_DATA.json'
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';

const Profile = () => {
    const userId = useParams().userId;

    const userData = mockUserData.find((user) => user.id.toString() === userId);

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/dashboard' },
                        { text: 'Profile', url: '/dashboard/User/Profile' }
                    ]}
                />

                <div>
                    <h1 className='text-customDark font-semibold text-2xl dark:text-gray-200 mt-5'>Profile</h1>
                </div>

                <div className='my-4 '>
                    <div className='grid gap-4 xl:grid-cols-2 2xl:grid-cols-3'>
                        <div className='relative p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-sm dark:bg-gray-800'>
                            {/* Profile Card */}
                            <UserProfileCard
                                id={userData.id}
                                avatar={userData.avatar}
                                first_name={userData.first_name}
                                last_name={userData.last_name}
                                email={userData.email}
                                phone={userData.phone}
                                gender={userData.gender}
                                dob={userData.dob}
                                status={userData.status}
                            />

                        </div>
                        <div className='relative p-4 flex flex-col h-auto bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                            <div>
                                {/* Tab */}
                                <UserProfileTabs
                                    id={userData.id}
                                    avatar={userData.avatar}
                                    first_name={userData.first_name}
                                    last_name={userData.last_name}
                                    email={userData.email}
                                    phone={userData.phone}
                                    gender={userData.gender}
                                    dob={userData.dob}
                                    status={userData.status}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Profile
