import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Dropdown = ({ buttonText = 'Options', items = [] }) => {
    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <div>
                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-xl font-semibold text-gray-600 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-900">
                        {buttonText}
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-700">
                        <div className="py-1">
                            {items.map((item, index) => (
                                <Menu.Item key={index}>
                                    {({ active }) => (
                                        <a
                                            href={item.href}
                                            className={classNames(
                                                active ? 'bg-gray-100 text-gray-900 dark:text-gray-100' : 'text-gray-700 dark:text-gray-200',
                                                'block px-4 py-2 text-sm'
                                            )}
                                        >
                                            {item.label}
                                        </a>
                                    )}
                                </Menu.Item>
                            ))}
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </>
    )
}

export default Dropdown
