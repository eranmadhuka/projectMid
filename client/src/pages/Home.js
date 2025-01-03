import React from 'react'
import Hero from '../components/Hero'
import About from '../components/About'
import Features from '../components/Features'
import How from '../components/How'
import Testimonial from '../components/Testimonial'
import Newslatter from '../components/Newslatter'
import ScrollToTop from '../components/ui/ScrollToTop'

const Home = () => {
    return (
        <>
            <Hero />
            <About />
            <Features />
            <How />
            <Testimonial />
            <Newslatter />
            <ScrollToTop />
        </>
    )
}

export default Home
