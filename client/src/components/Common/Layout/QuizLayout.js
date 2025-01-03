import React from "react";

const QuizLayout = ({ children, timer, questions, currentQuestionIndex, setCurrentQuestionIndex }) => {
    return (
        <div className="flex h-screen">
            {/* Left: Main Content */}
            <div className="flex-1  bg-white dark:bg-gray-800">{children}</div>

        </div>
    );
};

export default QuizLayout;
