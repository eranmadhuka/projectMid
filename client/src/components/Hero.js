import React from 'react'
import Button from './ui/Button'

import HeroImg from '../assets/images/hero1.webp'
import Calendar from '../assets/images/calendar.svg'
import UxClass from '../assets/images/ux-class.svg'
import Congrat from '../assets/images/congrat.svg'

const Hero = () => {
    return (
        <>
            <div className='dark:bg-gray-800'>
                <div className="relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                    <div
                        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                                backgroundImage: 'linear-gradient(to bottom right, #525FE1, #F86F03)',
                            }}
                        />
                    </div>

                    <div className="mx-auto py-10 sm:py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-center sm:flex-col-reverse">
                        <div className="lg:w-1/2 lg:pr-8 sm:my-10">
                            <div className="text-center lg:text-left">
                                <h1 className="text-6xl font-bold tracking-tight text-customDark sm:text-6xl dark:text-white">
                                    Enrich your learning journey with captivating <span className='text-customOrange'>quizzes</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
                                    Discover, learn, excel! Engage with quizzes that spark curiosity and track your educational progress. Join us on a learning adventure!                            </p>
                                <div className="mt-10 flex items-center justify-center lg:justify-start gap-x-6">
                                    <Button
                                        name="Get started"
                                        link="/docs/"
                                        styleType="mainBtn"
                                    />
                                    <a href="/" className="text-sm font-semibold leading-6 text-gray-900 hover:text-customOrange dark:text-white">
                                        Learn more <span aria-hidden="true">→</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-1/2 lg:p-10 sm:mb-5 relative hidden lg:block sm:hidden">
                            <img
                                className="w-auto h-auto"
                                src={HeroImg}
                                alt="Hero section banner"
                            />
                            {/* calendar */}
                            <div className="absolute top-20 -left-6 sm:top-32 sm:left-10 md:top-40 md:left-16 lg:-left-0 lg:top-52 floating-4">
                                <img src={Calendar} alt="Calendar" className='bg-white bg-opacity-80 rounded-lg h-12 sm:h-16' />
                            </div>
                            {/* UxClass */}
                            <div className="absolute bottom-14 -left-4 sm:left-2 sm:bottom-20 lg:bottom-24 lg:-left-4 floating">
                                <img src={UxClass} alt="UxClass" className='bg-white bg-opacity-80 rounded-lg h-20 sm:h-28' />
                            </div>
                            {/* Congrat */}
                            <div className="absolute bottom-20 md:bottom-48 lg:bottom-52 -right-6 lg:right-8 floating-4">
                                <img src={Congrat} alt="Congrat" className='bg-white bg-opacity-80 rounded-lg h-12 sm:h-16' />
                            </div>
                        </div>
                    </div>

                    <div
                        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                        aria-hidden="true"
                    >
                        <div
                            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#525FE1] to-[#F86F03] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                            style={{
                                clipPath:
                                    'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                            }}
                        />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Hero
