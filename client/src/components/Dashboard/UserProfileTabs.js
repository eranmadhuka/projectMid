import React, { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const UserProfileTabs = ({
    id,
    avatar,
    first_name,
    last_name,
    email,
    phone,
    gender,
    dob,
    status
}) => {
    const [tabIndex, setTabIndex] = useState(0);

    return (
        <>
            <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} id="controlled-tabs">
                <TabList className="flex sm:flex-row sm:justify-start sm:items-center space-x-4 border-b-2 dark:border-b-gray-400">
                    <Tab
                        className={`px-4 py-2 font-bold cursor-pointer border-4 border-white dark:border-transparent ${tabIndex === 0 ? 'border-0 border-b-4 text-customBlue border-b-customBlue dark:text-gray-200 dark:border-b-gray-100' : 'bg-white dark:bg-transparent dark:text-gray-200'
                            }`}
                    >
                        Personal Information
                    </Tab>
                    <Tab
                        className={`px-4 py-2 font-bold cursor-pointer border-4 border-white dark:border-transparent ${tabIndex === 1 ? 'border-0 border-b-4 text-customBlue border-b-customBlue dark:text-gray-200 dark:border-b-gray-100' : 'bg-white dark:bg-transparent dark:text-gray-200'
                            }`}
                    >
                        Contact Details
                    </Tab>
                </TabList>

                <TabPanel className="p-4">
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 space-x-10 ">
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">First Name</p>
                            <p className='font-semibold dark:text-gray-200'>{first_name}</p>
                        </div>
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Last Name</p>
                            <p className='font-semibold dark:text-gray-200'>{last_name}</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 space-x-10">
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Gender</p>
                            <p className='font-semibold dark:text-gray-200'>{gender}</p>
                        </div>
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Email Address</p>
                            <p className='font-semibold dark:text-gray-200'>{email}</p>
                        </div>
                    </div>
                    <span className='text-xs font-bold text-customDark dark:text-gray-400'>ADDITIONAL INFORMATION</span>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 space-x-10 mt-5">
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Joining Date</p>
                            <p className='font-semibold dark:text-gray-200'>08-16-2018 09:04PM</p>
                        </div>
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Reg Method</p>
                            <p className='font-semibold dark:text-gray-200'>Email</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 xl:grid-cols-3 gap-10 space-x-10 mt-5">
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Country</p>
                            <p className='font-semibold dark:text-gray-200'>Sri Lanka</p>
                        </div>
                        <div className=" mb-4">
                            <p className="text-sm font-normal dark:text-gray-400">Nationality</p>
                            <p className='font-semibold dark:text-gray-200'>Sri </p>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel className="p-4">
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </>
    );
};

export default UserProfileTabs;
