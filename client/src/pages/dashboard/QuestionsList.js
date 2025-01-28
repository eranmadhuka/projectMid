import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteForever } from "react-icons/md";
import Breadcrumb from "../../components/ui/Breadcrumb";
import Table from "../../components/Dashboard/ui/Table";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState(null); // State to store quiz details
    const { quizId } = useParams(); // Get the quizId from the URL
    const navigate = useNavigate();

    // Fetch quiz details and questions for the selected quiz
    useEffect(() => {
        const fetchQuizAndQuestions = async () => {
            try {
                // Fetch quiz details
                const quizResponse = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
                setQuiz(quizResponse.data);

                // Fetch questions for the quiz
                const questionsResponse = await axios.get(`http://localhost:5000/api/quizzes/${quizId}/questions`);
                setQuestions(questionsResponse.data);
            } catch (error) {
                console.error("Error fetching quiz or questions:", error);
                toast.error("Failed to fetch quiz or questions");
            }
        };
        fetchQuizAndQuestions();
    }, [quizId]);

    // Handle delete question with confirmation
    const handleDeleteQuestion = async (questionId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this question?");
        if (!confirmDelete) return;

        try {
            // Call the correct API endpoint with quizId and questionId
            await axios.delete(`http://localhost:5000/api/quizzes/${quizId}/questions/${questionId}`);

            // Update the state to remove the deleted question
            setQuestions(questions.filter((question) => question._id !== questionId));
            toast.success("Question deleted successfully");
        } catch (error) {
            console.error("Error deleting question:", error);
            toast.error("Failed to delete question");
        }
    };

    // Handle edit question (redirect to EditQuestion page)
    const handleEditQuestion = (question) => {
        navigate(`/admin/dashboard/quiz/manage/${quizId}/questions/${question._id}`);
    };

    // Handle add question (redirect to AddQuestion page)
    const handleAddQuestion = () => {
        navigate(`/admin/dashboard/quiz/manage/${quizId}/questions/add`);
    };

    // Table columns
    const columns = [
        {
            header: "Question Text",
            accessorKey: "text",
            footer: "Question Text",
        },
        {
            header: "Type",
            accessorKey: "type",
            footer: "Type",
        },
        {
            header: "Options",
            accessorKey: "options",
            footer: "Options",
            cell: (info) => (
                <ul>
                    {info.getValue()?.map((option, index) => (
                        <li key={index}>{option}</li>
                    ))}
                </ul>
            ),
        },
        {
            header: "Correct Answer",
            accessorKey: "correctAnswer",
            footer: "Correct Answer",
            cell: (info) => (
                Array.isArray(info.getValue()) ? info.getValue().join(", ") : info.getValue()
            ),
        },
        {
            header: "Correct Answer",
            accessorKey: "correctAnswers",
            footer: "Correct Answer",
            cell: (info) => (
                Array.isArray(info.getValue()) ? info.getValue().join(", ") : info.getValue()
            ),
        },
        {
            header: "Marks",
            accessorKey: "marks",
            footer: "Marks",
            cell: (info) => (
                Array.isArray(info.getValue()) ? info.getValue().join(", ") : info.getValue()
            ),
        },
        {
            header: "Actions",
            accessorKey: "actions",
            footer: "Actions",
            cell: (info) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleEditQuestion(info.row.original)}
                        className="bg-gray-200 hover:bg-blue-700 text-gray-500 hover:text-gray-100 dark:bg-gray-600 dark:text-gray-400 dark:hover:bg-gray-500 font-bold p-2 rounded"
                    >
                        <RiEdit2Fill />
                    </button>
                    <button
                        onClick={() => handleDeleteQuestion(info.row.original._id)}
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
                            { text: "Quiz Management", url: "/admin/dashboard/quiz/manage" },
                            { text: quiz ? quiz.title : "Questions" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Questions for <span className="text-blue-600">{quiz ? quiz.title : "Quiz"}</span>
                        </h1>
                        <div className="flex gap-2">
                            <button
                                onClick={() => navigate('/admin/dashboard/quizzes')}
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none transition-colors"
                            >
                                Back
                            </button>
                            <button
                                onClick={handleAddQuestion}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-colors"
                            >
                                Add Question
                            </button>
                        </div>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <Table
                            data={questions}
                            columns={columns}
                            title="Questions List"
                            placeholder="Search Questions"
                        />
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuestionList;