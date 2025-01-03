import React from 'react'

import Breadcrumb from './Breadcrumb'

const PageBanner = ({ links, title }) => {
    return (
        <>
            <div className='relative isolate overflow-hidden dark:bg-gray-800 py-9 sm:py-24 lg:py-10'>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className=" ">
                        <h2 className="text-3xl font-bold tracking-tight text-customDark dark:text-white sm:text-4xl">{title}</h2>
                        <Breadcrumb
                            links={[
                                { text: 'Home', url: '/' },
                                { text: 'About Us', url: '/about' }
                            ]}
                        />
                    </div>
                </div>
                <div className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                    <div
                        className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#F86F03] to-[#525FE1] opacity-30"
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                    />
                </div>
            </div>
        </>
    )
}

export default PageBanner
