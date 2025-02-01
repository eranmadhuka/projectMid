import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashboardLayout from "../../components/Common/Layout/DashboardLayout";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { useAuth } from '../../context/AuthContext'
const API_URL = process.env.REACT_APP_API_URL;

const QuestionAdd = () => {
    const { currentUser } = useAuth();
    const { quizId } = useParams();
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState(null);
    const [questionData, setQuestionData] = useState({
        text: "",
        type: "",
        options: [],
        correctAnswer: "",
        correctAnswers: [],
        marks: 1,
    });

    // Question types with icons and descriptions
    const questionTypes = [
        // {
        //     type: "true-false",
        //     title: "True or False",
        //     description: "A question with two possible answers: True or False.",
        // },
        {
            type: "multiple-choice",
            title: "Multiple Choice",
            description: "A question with multiple options and one correct answer.",
        },
        // {
        //     type: "checkbox",
        //     title: "Checkbox",
        //     description: "A question with multiple options and multiple correct answers.",
        // },
    ];

    // Handle question type selection
    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setQuestionData({ ...questionData, type, options: [], correctAnswer: "", correctAnswers: [] });
    };

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
        setQuestionData({ ...questionData, correctAnswer: value });
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

    // Handle form submission
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
            if (questionData.type === "multiple-choice") {
                payload.correctAnswer = questionData.correctAnswer;
            } else if (questionData.type === "checkbox") {
                payload.correctAnswers = questionData.correctAnswers;
            }

            // Send the request to the backend
            const response = await axios.post(
                `${API_URL}/api/quizzes/${quizId}/questions`,
                payload
            );

            toast.success("Question added successfully!");
            navigate(`/${currentUser.role}/dashboard/quiz/manage/${quizId}/questions`);
        } catch (error) {
            console.error("Error adding question:", error);
            if (error.response) {
                console.error("Backend response:", error.response.data);
            }
            toast.error("Failed to add question");
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
                            { text: "Quiz Management", url: "/admin/dashboard/quiz/manage" }
                        ]}
                    />
                    <div>
                        <h1 className="text-gray-800 font-semibold text-2xl dark:text-gray-300 mt-5">
                            Add Question
                        </h1>
                        <p className="text-customGray text-md mb-4">Manage Students.</p>
                    </div>

                    {/* Question Type Selection */}
                    {!selectedType && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {questionTypes.map((qType) => (
                                <div
                                    key={qType.type}
                                    className="p-6 cursor-pointer bg-white dark:bg-gray-800 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md transition-transform transform hover:scale-105"
                                    onClick={() => handleTypeSelect(qType.type)}
                                >
                                    <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 text-lg">
                                        {qType.title}
                                    </h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {qType.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Question Form */}
                    {selectedType && (
                        <form
                            onSubmit={handleSubmit}
                            className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-5xl"
                        >
                            {/* Back Button */}
                            <button
                                type="button"
                                onClick={() => setSelectedType(null)}
                                className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                ← Back to Question Types
                            </button>

                            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-8">
                                Add {questionTypes.find((q) => q.type === selectedType).title} Question
                            </h2>

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
                            {/* {selectedType === "true-false" && (
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
                            )} */}

                            {/* Multiple Choice Question */}
                            {selectedType === "multiple-choice" && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Options
                                    </label>
                                    {questionData.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-2">
                                            {/* Radio Button for Correct Answer */}
                                            <input
                                                type="radio"
                                                name="correctAnswer"
                                                value={index}
                                                checked={questionData.correctAnswer === index.toString()}
                                                onChange={handleCorrectAnswerChange}
                                                className="text-blue-600"
                                                disabled={questionData.options.length < 2}
                                            />
                                            {/* Option Input Field */}
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder={`Enter option ${index + 1}`}
                                                required
                                            />
                                            {/* Delete Option Button */}
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="text-red-600 hover:text-red-800 focus:outline-none"
                                                aria-label={`Remove option ${index + 1}`}
                                                disabled={questionData.options.length <= 2}
                                            >
                                                🗑️
                                            </button>
                                        </div>
                                    ))}
                                    {/* Add Option Button */}
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none mt-2"
                                    >
                                        + Add Option
                                    </button>
                                    {/* Validation Message */}
                                    {questionData.options.length < 2 && (
                                        <p className="text-sm text-red-600 dark:text-red-400 mt-2">
                                            A multiple-choice question requires at least two options.
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* Checkbox Question */}
                            {selectedType === "checkbox" && (
                                <div className="mb-6">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Options
                                    </label>
                                    {questionData.options.map((option, index) => (
                                        <div key={index} className="flex items-center space-x-4 mb-3">
                                            {/* Checkbox Input */}
                                            <input
                                                type="checkbox"
                                                checked={questionData.correctAnswers.includes(index)}
                                                onChange={(e) => handleCorrectAnswersChange(index, e.target.checked)}
                                                className="text-blue-600 w-5 h-5"
                                            />
                                            {/* Option Text Input */}
                                            <input
                                                type="text"
                                                value={option}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                                placeholder={`Option ${index + 1}`}
                                                required
                                            />
                                            {/* Remove Option Button */}
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
                                    {/* Add Option Button */}
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
                                    Add Question
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </DashboardLayout>
        </>
    );
};

export default QuestionAdd;