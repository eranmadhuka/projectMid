import React from 'react'

import AboutImg from '../assets/images/about.jpg'
// import AboutImg2 from '../assets/images/about2.jpg'
import Heading from './ui/Heading'
import Button from './ui/Button'

import { AiOutlineAim } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";

const About = () => {
    return (
        <>
            <div className='dark:bg-slate-800'>
                <div className='relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
                    <div className='mx-auto py-10 sm:py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-center'>
                        <div className='relative lg:w-1/2 lg:pl-8 h-[500px]'>
                            <img
                                className="object-cover h-full w-[500px] rounded-sm z-0 shadow-sm"
                                src={AboutImg}
                                alt="About"
                            />
                            {/* <img
                            className="absolute right-10 bottom-0 object-cover h-[250px] w-[350px] rounded-sm z-10"
                            src={AboutImg2}
                            alt="About2"
                        /> */}
                        </div>
                        <div className='lg:w-1/2 lg:pr-8 sm:mt-10'>
                            <Heading
                                preTitle="ABOUT US"
                                title="Unlock Knowledge, Excel in Your Journey!"
                            />
                            <p className='text-customGray my-10 dark:text-gray-400'>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            </p>
                            <div className="my-10 flex flex-row items-start justify-start">
                                <div>
                                    <div className="bg-customOrange rounded-full w-10 h-10 flex items-center justify-center">
                                        <AiOutlineAim className="text-white text-2xl" />
                                    </div>
                                </div>
                                <div className="pl-5">
                                    <h3 className="text-customDark font-semibold text-xl dark:text-white">Our Mission:</h3>
                                    <p className='text-customGray dark:text-gray-400'>
                                        To empower learners by providing accessible and engaging educational resources that foster growth and development
                                    </p>
                                </div>
                            </div>
                            <div className="my-10 flex flex-row items-start justify-start">
                                <div>
                                    <div className="bg-customOrange rounded-full w-10 h-10 flex items-center justify-center">
                                        <MdMenuBook className="text-white text-2xl" />
                                    </div>
                                </div>
                                <div className="pl-5">
                                    <h3 className="text-customDark font-semibold text-xl dark:text-white">Our Vision:</h3>
                                    <p className='text-customGray dark:text-gray-400'>
                                        To create a platform that inspires continuous learning, enabling individuals to reach their fullest potential and succeed in their endeavors.                                </p>
                                </div>
                            </div>
                            <div className='w-44 mt-5 text-center'>
                                <Button
                                    name="Get started"
                                    link="/docs/"
                                    styleType="mainBtn"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
