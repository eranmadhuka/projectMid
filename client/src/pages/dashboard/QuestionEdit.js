import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useAuth } from '../../context/AuthContext'
const API_URL = process.env.REACT_APP_API_URL;

const QuestionEdit = () => {
    const { currentUser } = useAuth();
    const { quizId, questionId } = useParams(); // Get quizId and questionId from the URL
    const navigate = useNavigate();
    const [questionData, setQuestionData] = useState({
        text: "",
        type: "",
        options: [],
        correctAnswer: "", // For True/False and Multiple Choice
        correctAnswers: [], // For Checkbox
        marks: 1,
    });

    // Fetch the existing question data when the component mounts
    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(
                    `${API_URL}/api/quizzes/${quizId}/questions/${questionId}`
                );
                const question = response.data;

                // Pre-fill the form with the fetched question data
                setQuestionData({
                    text: question.text,
                    type: question.type,
                    options: question.options,
                    correctAnswer: question.correctAnswer ? question.correctAnswer.toString() : "", // Convert to string
                    correctAnswers: question.correctAnswers || [],
                    marks: question.marks,
                });
            } catch (error) {
                console.error("Error fetching question:", error);
                toast.error("Failed to fetch question");
            }
        };
        fetchQuestion();
    }, [quizId, questionId]);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setQuestionData({ ...questionData, [name]: value });
    };

    // Handle option changes for multiple-choice and checkbox
    const handleOptionChange = (index, value) => {
        const newOptions = [...questionData.options];
        newOptions[index] = value;
        setQuestionData({ ...questionData, options: newOptions });
    };

    // Add a new option
    const addOption = () => {
        setQuestionData({ ...questionData, options: [...questionData.options, ""] });
    };

    // Remove an option
    const removeOption = (index) => {
        const newOptions = questionData.options.filter((_, i) => i !== index);
        setQuestionData({ ...questionData, options: newOptions });
    };

    // Handle correct answer selection for True/False and Multiple Choice
    const handleCorrectAnswerChange = (e) => {
        const { value } = e.target;
        setQuestionData({ ...questionData, correctAnswer: value }); // Store as string
    };

    // Handle correct answer selection for Checkbox
    const handleCorrectAnswersChange = (index, isChecked) => {
        let updatedCorrectAnswers = [...questionData.correctAnswers];
        if (isChecked) {
            updatedCorrectAnswers.push(index); // Add the index if the option is checked
        } else {
            updatedCorrectAnswers = updatedCorrectAnswers.filter((item) => item !== index); // Remove the index if the option is unchecked
        }
        setQuestionData({ ...questionData, correctAnswers: updatedCorrectAnswers });
    };

    // Handle form submission (update question)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Prepare the payload based on the question type
            const payload = {
                text: questionData.text,
                type: questionData.type,
                options: questionData.options,
                marks: questionData.marks,
            };

            // Add correct answer(s) based on the question type
            if (questionData.type === "true-false") {
                payload.correctAnswer = questionData.correctAnswer; // "true" or "false"
            } else if (questionData.type === "multiple-choice") {
                payload.correctAnswer = Number(questionData.correctAnswer); // Convert back to number
            } else if (questionData.type === "checkbox") {
                payload.correctAnswers = questionData.correctAnswers; // Array of indices for correct options
            }

            // Send the request to update the question
            const response = await axios.put(
                `${API_URL}/api/quizzes/${quizId}/questions/${questionId}`,
                payload
            );

            toast.success("Question updated successfully!");
            navigate(`/${currentUser.role}/dashboard/quiz/manage/${quizId}/questions`);
        } catch (error) {
            console.error("Error updating question:", error);
            if (error.response) {
                console.error("Backend response:", error.response.data); // Log the backend error message
            }
            toast.error("Failed to update question");
        }
    };

    // Handle cancel button click
    const handleCancel = () => {
        navigate(`/${currentUser.role}/dashboard/quiz/manage/${quizId}/questions`);
    };

    return (
        <>
            <ToastContainer />
            <DashboardLayout>
                <div>
                    <Breadcrumb
                        links={[
                            { text: "Home", url: "/dashboard" },
                            { text: "Quiz Management", url: "/admin/dashboard/quiz/manage" },
                            { text: "Edit Question" },
                        ]}
                    />
                    <div>
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Edit Question
                        </h1>
                        <p className="text-customGray text-md mb-4">Edit the question details.</p>
                    </div>

                    {/* Question Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl"
                    >
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                            Edit {questionData.type} Question
                        </h2>

                        {/* Question Text */}
                        {/* Question Text */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Question Text
                            </label>
                            <textarea
                                name="text"
                                value={questionData.text}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                rows={4}
                                required
                            />
                        </div>

                        {/* True/False Question */}
                        {questionData.type === "true-false" && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Correct Answer
                                </label>
                                <div className="flex items-center space-x-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            value="true"
                                            checked={questionData.correctAnswer === "true"}
                                            onChange={handleCorrectAnswerChange}
                                            className="text-blue-600"
                                        />
                                        <span className="text-gray-800 dark:text-gray-200">True</span>
                                    </label>
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            value="false"
                                            checked={questionData.correctAnswer === "false"}
                                            onChange={handleCorrectAnswerChange}
                                            className="text-blue-600"
                                        />
                                        <span className="text-gray-800 dark:text-gray-200">False</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* Multiple Choice Question */}
                        {questionData.type === "multiple-choice" && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Options
                                </label>
                                {questionData.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-2">
                                        <input
                                            type="radio"
                                            name="correctAnswer"
                                            value={index.toString()} // Ensure value is a string
                                            checked={questionData.correctAnswer === index.toString()} // Compare as strings
                                            onChange={handleCorrectAnswerChange}
                                            className="text-blue-600"
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder={`Option ${index + 1}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            className="text-red-600 hover:text-red-800 focus:outline-none"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addOption}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Add Option
                                </button>
                            </div>
                        )}

                        {/* Checkbox Question */}
                        {questionData.type === "checkbox" && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Options
                                </label>
                                {questionData.options.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-4 mb-3">
                                        <input
                                            type="checkbox"
                                            checked={questionData.correctAnswers.includes(index)}
                                            onChange={(e) => handleCorrectAnswersChange(index, e.target.checked)}
                                            className="text-blue-600 w-5 h-5"
                                        />
                                        <input
                                            type="text"
                                            value={option}
                                            onChange={(e) => handleOptionChange(index, e.target.value)}
                                            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                            placeholder={`Option ${index + 1}`}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeOption(index)}
                                            className="p-2 text-red-600 hover:text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                                            aria-label="Remove Option"
                                        >
                                            🗑️
                                        </button>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addOption}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    Add Option
                                </button>
                            </div>
                        )}

                        {/* Question Marks/Points */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Question Marks/Points
                            </label>
                            <input
                                type="number"
                                name="marks"
                                value={questionData.marks}
                                onChange={handleInputChange}
                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                min="1"
                                required
                            />
                        </div>

                        {/* Submit and Cancel Buttons */}
                        <div className="flex justify-start space-x-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            >
                                Update Question
                            </button>
                        </div>
                    </form>
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuestionEdit;