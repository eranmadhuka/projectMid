import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom"; // Import useParams and useNavigate
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Breadcrumb from "../../components/ui/Breadcrumb";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";

const QuizEdit = () => {
    const { quizId } = useParams(); // Get quizId from URL
    const navigate = useNavigate(); // Hook for navigation
    const [quiz, setQuiz] = useState({
        title: "",
        description: "",
        faculty: "",
        module: "",
        duration: "",
    });

    // Fetch quiz data on component mount
    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/quizzes/${quizId}`);
                setQuiz(response.data);
            } catch (error) {
                console.error("Error fetching quiz:", error);
                toast.error("Failed to fetch quiz");
            }
        };
        fetchQuiz();
    }, [quizId]);

    // Handle form submission (update quiz)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(
                `http://localhost:5000/api/quizzes/${quizId}`,
                quiz
            );
            toast.success("Quiz updated successfully");
            navigate("/admin/dashboard/quizzes"); // Redirect to quiz list after update
        } catch (error) {
            console.error("Error updating quiz:", error);
            toast.error("Failed to update quiz");
        }
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: "Home", url: "/dashboard" },
                            { text: "Edit Quiz" },
                        ]}
                    />
                    <div className="flex justify-between items-center">
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Edit Quiz
                        </h1>
                    </div>

                    <div className="relative my-4 p-4 flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 overflow-hidden xl:col-span-2 shadow-sm dark:bg-gray-800">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    value={quiz.title}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, title: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={quiz.description}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, description: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Faculty
                                </label>
                                <input
                                    type="text"
                                    value={quiz.faculty}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, faculty: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Module
                                </label>
                                <input
                                    type="text"
                                    value={quiz.module}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, module: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                                    Duration (mins)
                                </label>
                                <input
                                    type="number"
                                    value={quiz.duration}
                                    onChange={(e) =>
                                        setQuiz({ ...quiz, duration: e.target.value })
                                    }
                                    className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                                    required
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => navigate("/admin/quizzes")} // Redirect to quiz list
                                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Update Quiz
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuizEdit;