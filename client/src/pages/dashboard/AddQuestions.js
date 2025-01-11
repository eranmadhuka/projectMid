import React from 'react';
import Breadcrumb from '../../components/ui/Breadcrumb';
import AddQuestionForm from '../../components/Dashboard/AddQuestionForm';
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';

const AddQuestions = () => {
    const selectedMainCategory = { name: 'Computing', id: 1 }; // Sample selected main category
    const selectedSubCategory = { name: 'Year 1', id: 101 }; // Sample selected sub category
    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/dashboard' },
                        { text: 'Quiz Management' }
                    ]}
                />
                <h1 className='text-customDark font-semibold text-2xl dark:text-gray-200 mt-5'>Add Question</h1>

                <div className="grid gap-4 xl:grid-cols-2 2xl:grid-cols-3 my-10">
                    <div className='relative p-6 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800'>
                        <AddQuestionForm />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AddQuestions
