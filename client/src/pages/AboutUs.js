import React from 'react'

import PageBanner from '../components/ui/PageBanner'
import About from '../components/About'
import Newslatter from '../components/Newslatter'
import How from '../components/How'

const AboutUs = () => {
    return (
        <>
            <PageBanner
                links={[
                    { text: 'Home', url: '/' },
                    { text: 'About Us', url: '/about' }
                ]}
                title="About Us"
            />

            <About />
            <How />
            <Newslatter />
        </>
    )
}

export default AboutUs
