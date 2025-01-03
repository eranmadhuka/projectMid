import React from 'react'

const Heading = ({ preTitle, title }) => {
    return (
        <>
            <div>
                <h3 className='text-customBlue font-semibold dark:text-blue-100'>{preTitle}</h3>
                <h2 className='text-customDark font-bold text-4xl dark:text-white'>{title}</h2>
            </div>
        </>
    )
}

export default Heading
