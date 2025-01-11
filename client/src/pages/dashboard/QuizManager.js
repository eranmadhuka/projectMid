import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import Breadcrumb from '../../components/ui/Breadcrumb';
import DashboardLayout from '../../components/Common/Layout/DashboardLayout';

const QuizManager = () => {
    // States for selection hierarchy
    const [faculties, setFaculties] = useState([]);
    const [selectedFaculty, setSelectedFaculty] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedModule, setSelectedModule] = useState(null);
    const [modules, setModules] = useState([]);
    const years = ['Year 1', 'Year 2', 'Year 3', 'Year 4'];

    // State for quiz modal
    const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
    const [questionType, setQuestionType] = useState(''); // 'multiple', 'truefalse', 'checkbox'
    const [newQuestion, setNewQuestion] = useState({
        type: '',
        question: '',
        correctAnswer: '', // for true/false and multiple choice
        correctAnswers: [], // for checkbox type
        incorrectAnswers: [],
        difficulty: 'medium'
    });

    // Add this to your existing state declarations
    const [questions, setQuestions] = useState([
        // Sample data - replace with your API call
        {
            id: 1,
            question: "What is React?",
            correctAnswer: "A JavaScript library for building user interfaces",
            incorrectAnswers: [
                "A programming language",
                "A database system",
                "An operating system"
            ],
            difficulty: "medium"
        },
        // ... more questions
    ]);

    // Fetch faculties on component mount
    useEffect(() => {
        // Replace with your actual API call
        setFaculties([
            { id: 1, name: 'Faculty of Computing' },
            { id: 2, name: 'Faculty of Engineering' }
        ]);
    }, []);

    // Reset selections when faculty changes
    const handleFacultySelect = (faculty) => {
        setSelectedFaculty(faculty);
        setSelectedYear(null);
        setSelectedModule(null);
    };

    // Reset module when year changes
    const handleYearSelect = (year) => {
        setSelectedYear(year);
        setSelectedModule(null);
        // Fetch modules for selected faculty and year
        // Replace with your actual API call
        setModules([
            { id: 1, name: 'Programming Fundamentals', code: 'IT1010' },
            { id: 2, name: 'Database Systems', code: 'IT1020' }
        ]);
    };

    const handleEditQuestion = (question) => {
        setNewQuestion(question);
        setIsQuizModalOpen(true);
    };

    const handleDeleteQuestion = async (questionId) => {
        if (window.confirm('Are you sure you want to delete this question?')) {
            try {
                // Add your API call here
                // await deleteQuestion(questionId);
                setQuestions(questions.filter(q => q.id !== questionId));
            } catch (error) {
                console.error('Error deleting question:', error);
            }
        }
    };

    // Modify your existing useEffect to fetch questions when module is selected
    useEffect(() => {
        if (selectedModule) {
            // Replace with your actual API call
            // fetchQuestions(selectedModule.id);
        }
    }, [selectedModule]);

    // Add this function to handle question type selection
    const handleQuestionTypeSelect = (type) => {
        setQuestionType(type);
        setNewQuestion({
            type,
            question: '',
            correctAnswers: [], // Initialize empty array for checkbox type
            options: ['', '', '', ''], // Initialize with 4 empty options
            difficulty: 'medium'
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (questionType === 'multiple') {
            // Validate that a correct answer is selected
            if (newQuestion.correctOptionIndex === null) {
                alert('Please select the correct answer');
                return;
            }

            // Format the question data
            const formattedQuestion = {
                ...newQuestion,
                correctAnswer: newQuestion.options[newQuestion.correctOptionIndex],
                incorrectAnswers: newQuestion.options.filter((_, index) => index !== newQuestion.correctOptionIndex)
            };

            try {
                // Add your API call here
                // await saveQuestion(formattedQuestion);
                setQuestions([...questions, { ...formattedQuestion, id: Date.now() }]); // Temporary ID solution
                setIsQuizModalOpen(false);
                setQuestionType('');
            } catch (error) {
                console.error('Error saving question:', error);
            }
        }
        // ... handle other question types ...
    };

    return (
        <DashboardLayout>
            <div>
                <Breadcrumb
                    links={[
                        { text: 'Home', url: '/dashboard' },
                        { text: 'Quiz Management' }
                    ]}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    {/* Faculty Selection */}
                    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            Select Faculty
                        </h2>
                        <div className="space-y-2">
                            {faculties.map((faculty) => (
                                <button
                                    key={faculty.id}
                                    onClick={() => handleFacultySelect(faculty)}
                                    className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                        ${selectedFaculty?.id === faculty.id
                                            ? 'bg-blue-600 text-white'
                                            : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {faculty.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Year Selection */}
                    {selectedFaculty && (
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                Select Year
                            </h2>
                            <div className="space-y-2">
                                {years.map((year) => (
                                    <button
                                        key={year}
                                        onClick={() => handleYearSelect(year)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                            ${selectedYear === year
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {year}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Module Selection */}
                    {selectedYear && (
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                                Select Module
                            </h2>
                            <div className="space-y-2">
                                {modules.map((module) => (
                                    <button
                                        key={module.id}
                                        onClick={() => setSelectedModule(module)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors duration-200
                                            ${selectedModule?.id === module.id
                                                ? 'bg-blue-600 text-white'
                                                : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                    >
                                        {module.name}
                                        <div className="text-sm opacity-75">{module.code}</div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Questions Section - Replace the simple Add Question button div */}
                    {selectedModule && (
                        <div className="md:col-span-4 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                                    Questions for {selectedModule.name}
                                </h2>
                                <button
                                    onClick={() => setIsQuizModalOpen(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg
                                        transition-colors duration-200"
                                >
                                    Add New Question
                                </button>
                            </div>

                            {/* Questions Table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-700">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                No
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Question Type
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Question
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Correct Answer
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Difficulty
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-200 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {questions.map((question, index) => (
                                            <tr key={question.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:text-gray-200 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                    {index + 1}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-green-600 dark:text-green-500">
                                                        {question.type}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100">
                                                        {question.question}
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                                        Wrong Answers: {question.incorrectAnswers.join(', ')}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-green-600 dark:text-green-500">
                                                        {question.correctAnswer}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                                        ${question.difficulty === 'easy'
                                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                                            : question.difficulty === 'medium'
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                                        }`}>
                                                        {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                    <div className="flex space-x-3">
                                                        <button
                                                            onClick={() => handleEditQuestion(question)}
                                                            className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                                                        >
                                                            Edit
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteQuestion(question.id)}
                                                            className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                                                        >
                                                            Delete
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Empty State */}
                                {questions.length === 0 && (
                                    <div className="text-center py-10">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            No questions added yet. Click "Add New Question" to create one.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Question Modal */}
            {isQuizModalOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-[600px] shadow-lg">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                            {!questionType ? 'Select Question Type' : 'Add New Question'}
                        </h2>

                        {/* Question Type Selection */}
                        {!questionType ? (
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => handleQuestionTypeSelect('multiple')}
                                    className="p-4 border dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 
                                        dark:hover:bg-gray-750 transition-colors duration-200"
                                >
                                    <div className="font-medium text-gray-800 dark:text-gray-100 mb-1">Multiple Choice</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Question with one correct answer from multiple options
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleQuestionTypeSelect('truefalse')}
                                    className="p-4 border dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 
                                        dark:hover:bg-gray-750 transition-colors duration-200"
                                >
                                    <div className="font-medium text-gray-800 dark:text-gray-100 mb-1">True or False</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Simple true or false question
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleQuestionTypeSelect('checkbox')}
                                    className="p-4 border dark:border-gray-700 rounded-lg text-left hover:bg-gray-50 
                                        dark:hover:bg-gray-750 transition-colors duration-200"
                                >
                                    <div className="font-medium text-gray-800 dark:text-gray-100 mb-1">Checkbox Choice</div>
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Question with multiple correct answers
                                    </div>
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                {/* Question Text */}
                                <div className="mb-4">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                        Question
                                    </label>
                                    <textarea
                                        value={newQuestion.question}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                                        className="w-full p-2.5 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
                                        rows="3"
                                        required
                                    />
                                </div>

                                {/* True/False Question */}
                                {questionType === 'truefalse' && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                            Correct Answer
                                        </label>
                                        <div className="space-y-2">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="truefalse"
                                                    value="True"
                                                    checked={newQuestion.correctAnswer === 'True'}
                                                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-gray-700 dark:text-gray-200">True</span>
                                            </label>
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="radio"
                                                    name="truefalse"
                                                    value="False"
                                                    checked={newQuestion.correctAnswer === 'False'}
                                                    onChange={(e) => setNewQuestion({ ...newQuestion, correctAnswer: e.target.value })}
                                                    className="text-blue-600"
                                                />
                                                <span className="text-gray-700 dark:text-gray-200">False</span>
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Multiple Choice Question */}
                                {questionType === 'multiple' && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                                            Answer Options
                                        </label>
                                        <div className="space-y-3">
                                            {newQuestion.options.map((option, index) => (
                                                <div key={index} className="flex items-center gap-3">
                                                    <input
                                                        type="radio"
                                                        name="correctAnswer"
                                                        checked={newQuestion.correctOptionIndex === index}
                                                        onChange={() => setNewQuestion({
                                                            ...newQuestion,
                                                            correctOptionIndex: index
                                                        })}
                                                        className="w-4 h-4 text-blue-600 dark:text-blue-500"
                                                        required={index === 0} // Require at least one selection
                                                    />
                                                    <input
                                                        type="text"
                                                        value={option}
                                                        onChange={(e) => {
                                                            const newOptions = [...newQuestion.options];
                                                            newOptions[index] = e.target.value;
                                                            setNewQuestion({
                                                                ...newQuestion,
                                                                options: newOptions
                                                            });
                                                        }}
                                                        placeholder={`Option ${index + 1}`}
                                                        className="flex-1 p-2.5 rounded-lg border border-gray-300 
                                                            dark:border-gray-600 dark:bg-gray-700 
                                                            focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                            text-gray-900 dark:text-white"
                                                        required
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Select the radio button next to the correct answer
                                        </p>
                                    </div>
                                )}

                                {/* Checkbox Choice Question */}
                                {questionType === 'checkbox' && (
                                    <div className="mb-4">
                                        <label className="block text-gray-700 dark:text-gray-200 mb-2 font-medium">
                                            Answer Options
                                        </label>
                                        <div className="space-y-3">
                                            {newQuestion.options.map((option, index) => (
                                                <div key={index} className="mb-3">
                                                    <div className="flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            checked={newQuestion.correctAnswers.includes(index)}
                                                            onChange={(e) => {
                                                                setNewQuestion(prev => ({
                                                                    ...prev,
                                                                    correctAnswers: e.target.checked
                                                                        ? [...prev.correctAnswers, index]
                                                                        : prev.correctAnswers.filter(i => i !== index)
                                                                }));
                                                            }}
                                                            className="w-4 h-4 text-blue-600 dark:text-blue-500 rounded"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => {
                                                                const newOptions = [...newQuestion.options];
                                                                newOptions[index] = e.target.value;
                                                                setNewQuestion(prev => ({
                                                                    ...prev,
                                                                    options: newOptions
                                                                }));
                                                            }}
                                                            placeholder={`Option ${index + 1}`}
                                                            className="flex-1 p-2.5 rounded-lg border border-gray-300 
                                                                dark:border-gray-600 dark:bg-gray-700 
                                                                focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                                                                text-gray-900 dark:text-white"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400 ml-7 mt-1">
                                                        Check if this is a correct answer
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                            Select all correct answers (minimum one required)
                                        </p>
                                    </div>
                                )}

                                {/* Difficulty Selection */}
                                <div className="mb-6">
                                    <label className="block text-gray-700 dark:text-gray-200 mb-2">
                                        Difficulty
                                    </label>
                                    <select
                                        value={newQuestion.difficulty}
                                        onChange={(e) => setNewQuestion({ ...newQuestion, difficulty: e.target.value })}
                                        className="w-full p-2.5 rounded-lg border dark:border-gray-600 dark:bg-gray-700"
                                    >
                                        <option value="easy">Easy</option>
                                        <option value="medium">Medium</option>
                                        <option value="hard">Hard</option>
                                    </select>
                                </div>

                                {/* Form Actions */}
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsQuizModalOpen(false);
                                            setQuestionType('');
                                        }}
                                        className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 
                                            dark:hover:bg-gray-700 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                                    >
                                        Add Question
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default QuizManager;
