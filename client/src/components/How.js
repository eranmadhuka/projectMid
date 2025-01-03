import React from 'react'

import Heading from './ui/Heading'

import { steps } from '../data'


const How = () => {
    return (
        <>
            <div className='dark:bg-slate-800'>
                <div className='relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
                    <div className='text-center px-4'>
                        <Heading
                            preTitle="HOW IT WORK"
                            title="Check How We Work in Easy Steps"
                        />
                    </div>
                    <div className='grid md:grid-cols-3 gap-14 md:gap-5 mt-20 text-center'>
                        {steps.map((item, index) => {
                            return (
                                <div key={item.id} className='max-w-xs sm:max-w-full border-none m-3 bg-white text-center rounded-md dark:bg-gray-800'>
                                    <div className="relative">
                                        <div className='absolute w-12 h-12 p-3 bg-customOrange rounded-full -right-5 -top-5'>
                                            <span className='text-white font-semibold text-xl'>{item.count}</span>
                                        </div>
                                        <img src={item.imageUrl} alt="feature-img"
                                            className='rounded-t-lg'
                                        />
                                    </div>
                                    <div className='p-3'>
                                        <h3 className='mt-5 text-xl font-bold tracking-tight text-gray-900 dark:text-gray-300'>{item.title}</h3>
                                        <p className=' mt-3 text-customGray dark:text-gray-300'>{item.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default How
