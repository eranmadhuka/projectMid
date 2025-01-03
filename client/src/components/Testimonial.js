import React, { useRef } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import Heading from './ui/Heading'

import AvatarImg1 from '../assets/images/avatars/avatar1.jpg'
import AvatarImg2 from '../assets/images/avatars/avatar2.jpg'

const testimonials = [
    {
        id: 1,
        name: "John Doe",
        title: "CEO of XYZ Inc.",
        image: AvatarImg1,
        text: "No, Rose, they are not breathing.And they have no arms orlegs … Where are they? You know what? If we come acrosssomebody with no arms or legs, do we bother resuscitatingthem? I mean, what quality of life do we have there? "
    },
    {
        id: 2,
        name: "John Doe",
        title: "CEO of XYZ Inc.",
        image: AvatarImg2,
        text: "No, Rose, they are not breathing.And they have no arms orlegs … Where are they? You know what? If we come acrosssomebody with no arms or legs, do we bother resuscitatingthem? I mean, what quality of life do we have there? "
    },
    {
        id: 3,
        name: "John Doe",
        title: "CEO of XYZ Inc.",
        image: AvatarImg1,
        text: "No, Rose, they are not breathing.And they have no arms orlegs … Where are they? You know what? If we come acrosssomebody with no arms or legs, do we bother resuscitatingthem? I mean, what quality of life do we have there? "
    },
    {
        id: 4,
        name: "John Doe",
        title: "CEO of XYZ Inc.",
        image: AvatarImg2,
        text: "No, Rose, they are not breathing.And they have no arms orlegs … Where are they? You know what? If we come acrosssomebody with no arms or legs, do we bother resuscitatingthem? I mean, what quality of life do we have there? "
    },
];

const Testimonial = () => {
    const swiperRef = useRef(null);

    const slideNext = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideNext();
        }
    };

    const slidePrev = () => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slidePrev();
        }
    };

    return (
        <div className='dark:bg-slate-900'>
            <div className='relative isolate mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20'>
                <div className='mx-auto py-10 sm:py-20 lg:py-0 flex flex-col lg:flex-row items-center justify-center'>
                    <div className='relative lg:w-2/5 pe-10'>
                        <Heading
                            preTitle="ABOUT US"
                            title="Unlock Knowledge, Excel in Your Journey!"
                        />
                        <div className="flex justify-start mt-4">
                            <button onClick={slidePrev}
                                className='rounded-full border border-customOrange p-3 me-3 text-customOrange transition hover:bg-customOrange hover:text-white'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="h-5 w-5 rtl:rotate-180"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 19.5L8.25 12l7.5-7.5"
                                    />
                                </svg>
                            </button>
                            <button onClick={slideNext}
                                className='rounded-full border border-customOrange p-3 me-3 text-customOrange transition hover:bg-customOrange hover:text-white'>
                                <svg
                                    class="h-5 w-5 rtl:rotate-180"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9 5l7 7-7 7"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className='lg:w-3/5 sm:w-full lg:pr-8 py-10'>
                        <Swiper
                            ref={swiperRef}
                            spaceBetween={20}
                            slidesPerView={2}
                            breakpoints={{
                                320: {
                                    slidesPerView: 1, // Show one slide per view on screens >= 640px
                                },
                                768: {
                                    slidesPerView: 2, // Show two slides per view on screens >= 768px
                                },
                                1024: {
                                    slidesPerView: 2, // Show two slides per view on screens >= 1024px
                                },
                            }}
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
                        >
                            {testimonials.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className='bg-white shadow-md rounded-lg p-6 m-3 dark:bg-slate-800'>
                                        <p className='text-customGray text-base dark:text-gray-300'>
                                            {item.text}
                                        </p>
                                        <div className='flex items-center mt-5'>
                                            <div className='w-14 h-14'>
                                                <img
                                                    src={item.image}
                                                    alt='Avatar1'
                                                    className='rounded-full w-full h-full object-cover shadow-md'
                                                />
                                            </div>
                                            <div className='ms-5'>
                                                <h2 className='text-customDark font-semibold text-xl dark:text-white'>
                                                    {item.name}
                                                </h2>
                                                <span className='text-customGray text-sm dark:text-gray-400'>
                                                    {item.title}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Testimonial;
