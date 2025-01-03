import React, { useMemo } from 'react'
import { DateTime } from 'luxon'

import mData from '../../../MOCK_DATA.json'
import Table from '../../../components/Dashboard/ui/Table'
import Breadcrumb from '../../../components/ui/Breadcrumb'

import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import { Link } from 'react-router-dom'
import DashboardLayout from '../../../components/Common/Layout/DashboardLayout'

const InstructorsList = () => {

    // const [dataaa, setData] = useState()
    // useEffect(() => {
    //     axios.get('https://reqres.in/api/users?page=2')
    //         .then(res => setData(res.data.data))
    //         .catch(err => console.log(err))
    // }, [])

    const data = useMemo(() => mData, [])

    const columns = [
        {
            header: 'ID',
            accessorKey: 'id',
            footer: 'ID'
        },
        {
            header: 'Avatar',
            accessorKey: 'avatar',
            footer: 'Avatar'
        },
        {
            header: 'Name',
            accessorFn: row => `${row.first_name} ${row.last_name}`,
        },
        {
            header: 'Email',
            accessorKey: 'email',
            footer: 'Email'
        },
        {
            header: 'Phone',
            accessorKey: 'phone',
            footer: 'Phone'
        },
        {
            header: 'Gender',
            accessorKey: 'gender',
            footer: 'Gender'
        },
        {
            header: 'DOB',
            accessorKey: 'dob',
            footer: 'DOB',
            cell: info => {
                const formattedDate = DateTime.fromFormat(info.getValue(), 'M/d/yyyy').toLocaleString(DateTime.DATE_MED);
                return <span>{formattedDate}</span>;
            },
        },
        {
            header: 'Status',
            accessorKey: 'status',
            footer: 'Status',
            cell: info => {
                <span className={` ${info.getValue() ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-red-100 text-red-800  dark:bg-red-900 dark:text-red-300'} text-xs font-medium me-2 px-2.5 py-0.5 rounded`}>
                    {info.getValue() === true ? 'Active' : 'Inactive'}
                </span>
            },
        },
        {
            header: 'Actions',
            accessorKey: 'actions',
            footer: 'Actions',
            cell: (info) => (
                <div className="flex space-x-2">
                    <Link
                        to={`/dashboard/user/profile/${encodeURIComponent(info.row.original.id)}`}
                        className="bg-gray-200 hover:bg-green-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <FaRegEye />
                    </Link>
                    <Link
                        to={`/dashboard/user/edit/${encodeURIComponent(info.row.original.id)}`}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </Link>
                    <Link
                        to={`/dashboard/user/delete/${encodeURIComponent(info.row.original.id)}`}
                        className="bg-gray-200 hover:bg-red-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdDeleteForever />
                    </Link>
                </div>
            ),
        },
    ]
    return (
        <DashboardLayout>
            <main className='bg-gray-50 px-3 md:px-8 h-auto dark:bg-gray-900'>
                <div className='px-10 pt-5 sm:px-5'>
                    <Breadcrumb
                        links={[
                            { text: 'Home', url: '/dashboard' },
                            { text: 'Instructors List', url: '/dashboard/Instructors/list' }
                        ]}
                    />

                    <div>
                        <h1 className='text-customDark font-semibold text-2xl dark:text-gray-200 mt-5'>Instructors</h1>
                        <p className='text-customGray text-sm'>Manage Instructors.</p>
                    </div>

                    <div className='relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                        <Table
                            data={data}
                            columns={columns}
                            title="Instructors Lists"
                            buttonTxt="+ Add Instructor"
                            buttonLink="/dashboard/Instructors/add"
                        />
                    </div>
                </div>
            </main>
        </DashboardLayout>
    )
}

export default InstructorsList
