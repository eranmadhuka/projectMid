import React from 'react'
import { DateTime } from 'luxon';

import { FaBirthdayCake } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const UserProfileCard = ({
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
    const formattedDOB = DateTime.fromISO(dob).toFormat('LLLL dd, yyyy'); // Formats date using Luxon

    return (
        <>
            <div className='relative'>
                <div className='absolute right-0 top-0'>
                    <span
                        className={`${status == true ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800  dark:bg-red-900 dark:text-red-300'} text-xs font-medium px-2.5 py-0.5 rounded`}
                    >{status === true ? 'Active' : 'Ofline'}
                    </span>
                </div>
                <img src={avatar} alt={avatar}
                    className='rounded-2xl w-32 h-32 object-cover'
                />
                <h2 className='text-xl text-customDark font-semibold dark:text-gray-200 my-3'>{first_name} {last_name}</h2>
                <div className='my-3'>
                    <div className='flex items-center space-x-3 text-sm text-customGray dark:text-gray-400'>
                        <FaBirthdayCake />
                        <span>{formattedDOB}</span>
                    </div>
                    <div className='flex items-center space-x-3 text-sm text-customGray dark:text-gray-400'>
                        <MdLocationOn />
                        <span>San Francisco, USA</span>
                    </div>
                </div>
                <dl className='max-w-md text-gray-900 divide-y space-y-3 divide-gray-200 dark:text-white dark:divide-gray-700'>
                    <div className='flex flex-col pb-3'>
                        <span className='text-sm text-customGray dark:text-gray-400'>Email adress</span>
                        <h3 className='font-semibold text-customDark dark:text-gray-200'>{email}</h3>
                    </div>
                    <div className='flex flex-col pb-3'>
                        <span className='text-sm text-customGray dark:text-gray-400'>Home adress</span>
                        <h3 className='font-semibold text-customDark dark:text-gray-200'>92 Miles Drive, Newark, NJ 07103, California,
                            United States of America</h3>
                    </div>
                    <div className='flex flex-col pb-3'>
                        <span className='text-sm text-customGray dark:text-gray-400'>Phone number</span>
                        <h3 className='font-semibold text-customDark dark:text-gray-200'>{phone}</h3>
                    </div>
                </dl>
            </div>
        </>
    )
}

export default UserProfileCard
