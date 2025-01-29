import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import 'react-toastify/dist/ReactToastify.css';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Table from "../../components/Dashboard/ui/Table";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";
import { useAuth } from '../../context/AuthContext'
const API_URL = process.env.REACT_APP_API_URL;

const QuizList = () => {
    const { currentUser } = useAuth();
    const [quizzes, setQuizzes] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    // Fetch all quizzes on component mount
    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/quizzes`);
                setQuizzes(response.data);
            } catch (error) {
                console.error("Error fetching quizzes:", error);
                toast.error("Failed to fetch quizzes");
            }
        };
        fetchQuizzes();
    }, []);

    // Handle delete quiz with confirmation
    const handleDeleteQuiz = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this quiz?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/api/quizzes/${id}`);
            setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
            toast.success("Quiz deleted successfully");
        } catch (error) {
            console.error("Error deleting quiz:", error);
            toast.error("Failed to delete quiz");
        }
    };

    // Handle edit quiz (redirect to EditQuiz page)
    const handleEditQuiz = (quiz) => {
        navigate(`/${currentUser.role}/dashboard/quiz/manage/${quiz._id}`);
    };

    // Handle row click (redirect to QuestionList page)
    const handleRowClick = (quizId) => {
        navigate(`/${currentUser.role}/dashboard/quiz/manage/${quizId}/questions`);
    };

    // Table columns
    const columns = [
        {
            header: "Title",
            accessorKey: "title",
            footer: "Title",
            cell: (info) => (
                <span
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    onClick={() => handleRowClick(info.row.original._id)}
                >
                    {info.getValue()}
                </span>
            ),
        },
        {
            header: "Description",
            accessorKey: "description",
            footer: "Description",
        },
        {
            header: "Faculty",
            accessorKey: "faculty.name",
            footer: "Faculty",
        },
        {
            header: "Year",
            accessorKey: "module.year",
            footer: "Year",
        },
        {
            header: "Module",
            accessorKey: "module.moduleName",
            footer: "Module",
        },
        {
            header: "Module Code",
            accessorKey: "module.moduleCode",
            footer: "Module Code",
        },
        {
            header: "Duration (mins)",
            accessorKey: "duration",
            footer: "Duration",
        },
        {
            header: "Total Questions",
            accessorKey: "questions",
            footer: "Total Questions",
            cell: (info) => info.getValue().length,
        },
        {
            header: "Actions",
            accessorKey: "actions",
            footer: "Actions",
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditQuiz(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </button>
                    <button
                        onClick={() => handleDeleteQuiz(info.row.original._id)}
                        className="bg-gray-200 hover:bg-red-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <MdDeleteForever />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: "Home", url: "/dashboard" },
                            { text: "Quiz Management" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Quiz Management
                        </h1>
                        <div>
                            <Link to="/admin/dashboard/quiz/manage/add">
                                <button
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Add Quiz
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <Table
                            data={quizzes}
                            columns={columns}
                            title="Quizzes List"
                            placeholder="Search Quizzes"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuizList;