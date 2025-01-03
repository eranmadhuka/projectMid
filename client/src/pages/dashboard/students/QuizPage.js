import React, { useState, useEffect } from 'react';
import QuizLayout from '../../../components/Common/Layout/QuizLayout';
import { useAuth } from '../../../context/AuthContext';

const QuizPage = ({ questions = [], duration = 1, navigateToResults }) => {
    const { user, logout } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timer, setTimer] = useState(() => {
        const savedTime = localStorage.getItem('quizTimer');
        return savedTime ? parseInt(savedTime, 10) : duration * 60;
    });
    const [answers, setAnswers] = useState({});
    const [flaggedQuestions, setFlaggedQuestions] = useState([]);
    const [isTimeUp, setIsTimeUp] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 0) {
                    clearInterval(interval);
                    setIsTimeUp(true); // Show the popup when time is up
                    localStorage.removeItem('quizTimer'); // Clear timer from storage
                    return 0;
                }
                const newTime = prev - 1;
                localStorage.setItem('quizTimer', newTime); // Save the remaining time in localStorage
                return newTime;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleAnswerChange = (questionId, answer) => {
        setAnswers({ ...answers, [questionId]: answer });
    };

    const handleFlagQuestion = (questionId) => {
        setFlaggedQuestions((prev) =>
            prev.includes(questionId) ? prev.filter((id) => id !== questionId) : [...prev, questionId]
        );
    };

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    const handleNavigation = (index) => {
        setCurrentQuestionIndex(index);
    };

    const finishAttempt = () => {
        console.log('Finish Attempt', answers);
        localStorage.removeItem('quizTimer'); // Clear timer when finishing the quiz
    };

    const handleSubmit = () => {
        console.log('Submitted Answers:', answers);
        alert('Submitted Answers:', JSON.stringify(answers));
        localStorage.removeItem('quizTimer'); // Clear timer when submitting
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <QuizLayout timer={formatTime(timer)} questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex}>
            {/* Header */}
            <div className="bg-blue-600 text-white py-3 px-6 flex justify-between items-center">
                <div className="flex items-center">
                    <h1 className="text-lg font-bold">Online Exams</h1>
                    <h2 className="text-md ml-3">Dashboard</h2>
                </div>
                <div className="flex items-center gap-4">
                    <span>{user.name}</span>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex h-screen px-3">
                {/* Left Column: Question Info */}
                <div className="w-1/5 p-6 bg-white border-r">
                    <h2 className="text-lg font-semibold mb-4">Question Info</h2>
                    <p className="mb-2">
                        <span className="font-bold">Question:</span> {currentQuestionIndex + 1} of {questions.length}
                    </p>
                    <button
                        className={`text-sm px-4 py-2 rounded ${flaggedQuestions.includes(currentQuestion?.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-300 text-gray-700'
                            }`}
                        onClick={() => handleFlagQuestion(currentQuestion?.id)}
                    >
                        {flaggedQuestions.includes(currentQuestion?.id) ? 'Unflag Question' : 'Flag Question'}
                    </button>
                </div>

                {/* Middle Column: Question Display */}
                <div className="w-3/5 p-6 bg-white">
                    <h2 className="text-lg font-semibold">Question {currentQuestionIndex + 1}</h2>
                    <p className="mt-4 text-gray-800">{currentQuestion?.text}</p>

                    <div className="mt-6">
                        {currentQuestion?.options.map((option, index) => (
                            <div key={index} className="mt-2">
                                <input
                                    type="radio"
                                    id={`option-${index}`}
                                    name={`question-${currentQuestion.id}`}
                                    value={option}
                                    checked={answers[currentQuestion.id] === option}
                                    onChange={() => handleAnswerChange(currentQuestion.id, option)}
                                />
                                <label htmlFor={`option-${index}`} className="ml-2 text-gray-700">
                                    {option}
                                </label>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 flex justify-between">
                        <button
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
                            onClick={() => setCurrentQuestionIndex((prev) => Math.max(0, prev - 1))}
                            disabled={currentQuestionIndex === 0}
                        >
                            Previous
                        </button>
                        {currentQuestionIndex === questions.length - 1 ? (
                            <button
                                onClick={handleSubmit}
                                className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                            >
                                Submit
                            </button>
                        ) : (
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded"
                                onClick={() => setCurrentQuestionIndex((prev) => Math.min(questions.length - 1, prev + 1))}
                                disabled={currentQuestionIndex === questions.length - 1}
                            >
                                Next
                            </button>
                        )}
                    </div>
                </div>

                {/* Right Column: Timer and Navigation */}
                <div className="w-1/5 p-6 bg-white border-l">
                    <h2 className="text-lg font-semibold mb-4">Quiz Navigation</h2>
                    <div className="grid grid-cols-4 gap-2">
                        {questions.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleNavigation(index)}
                                className={`p-2 rounded ${currentQuestionIndex === index
                                    ? 'bg-blue-600 text-white'
                                    : flaggedQuestions.includes(index + 1)
                                        ? 'bg-red-500 text-white'
                                        : answers[questions[index].id]
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white border text-gray-700'
                                    }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-6">
                        <button
                            className="bg-green-600 text-white px-4 py-2 rounded w-full"
                            onClick={finishAttempt}
                        >
                            Finish Attempt
                        </button>
                    </div>

                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            <span className="font-semibold">Time Left:</span> {formatTime(timer)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Time Up Modal */}
            {isTimeUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h2 className="text-lg font-bold mb-4">Time's Up!</h2>
                        <p className="mb-4">The quiz time is over. Please proceed to the results page.</p>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={navigateToResults}
                        >
                            View Results
                        </button>
                    </div>
                </div>
            )}
        </QuizLayout>
    );
};

export default QuizPage;
