import React from 'react'
import Heading from './ui/Heading'

import FeatureImg1 from '../assets/images/google-docs.png'

const featuresList = [
    {
        id: 1,
        title: "Marketing",
        desc: "Plan it, create it, launch it. Collaborate seamlessly with all the organization ry month with our marketing plan.",
        img: FeatureImg1
    },
    {
        id: 2,
        title: "Business Automation",
        desc: "Auto-assign tasks, send Slack messages, and much more. Now power up with hundreds of new templates  rted.",
        img: FeatureImg1
    },
    {
        id: 3,
        title: "Finance",
        desc: "Audit-proof software built for critical financial operations like month-end close and quarterly budgeting.",
        img: FeatureImg1
    },
    {
        id: 4,
        title: "Enterprise Design",
        desc: "Craft beautiful, delightful experiences for both marketing and product with real cross-company  .",
        img: FeatureImg1
    },
];

const Features = () => {
    return (
        <>
            <div className='dark:bg-slate-900'>
                <div className='relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
                    <div className='text-center px-4'>
                        <Heading
                            preTitle="WHY CHOOSE US"
                            title="Key Features to Elevate Your Learning Experience"
                        />
                    </div>
                    <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-14 md:gap-5 mt-20 text-center'>
                        {featuresList.map((item) => {
                            return (
                                <div className='max-w-xs sm:max-w-full border-none m-3 bg-white shadow-md p-6 text-center rounded-md dark:bg-gray-800'>
                                    <div className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12 bg-blue-100">
                                        <img src={item.img} alt="feature-img"
                                            className='h-8'
                                        />
                                    </div>
                                    <h3 className='mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-300'>{item.title}</h3>
                                    <p className='text-customGray dark:text-gray-300'>{item.desc}</p>
                                </div>
                            );
                        })}
                    </div>
                </div >
            </div>
        </>
    )
}

export default Features
