import React, { useState } from 'react';

const QAGComponent = ({ question, answer }) => {
    // Split the question into lines and find the index where question parts start
    const lines = question.split('\n');
    const contextIndex = lines.findIndex(line => /^\d+\./.test(line));

    // Extract the context, question parts, and answer parts
    const Context = lines.slice(0, contextIndex).join('\n').trim();
    const QuestionParts = lines.slice(contextIndex).filter(part => part.trim() !== '');
    const AnswerParts = answer.split(/\n\d+\.\s/).map(part => part.trim()).filter(part => part !== '')

    // State to track whether each answer is revealed or concealed
    const [showAnswers, setShowAnswers] = useState(Array(QuestionParts.length).fill(false));

    // Function to toggle the reveal/conceal state of an answer
    const handleToggleAnswer = (index) => {
        const updatedShowAnswers = [...showAnswers];
        updatedShowAnswers[index] = !updatedShowAnswers[index];
        setShowAnswers(updatedShowAnswers);
    };

    return (
        <div className="qag-component">
            {/* Display the context */}
            <div className="context">
                <pre>{Context}</pre>
            </div>

            {/* Display question parts and corresponding answers */}
            {QuestionParts.map((questionPart, index) => (
                <div key={index}>
                    <pre>{questionPart}</pre>
                    {showAnswers[index] ? (
                        <div className="answer">
                            <pre>{AnswerParts[index]}</pre>
                            <button onClick={() => handleToggleAnswer(index)}>Conceal Answer</button>
                        </div>
                    ) : (
                        <div>
                            <button onClick={() => handleToggleAnswer(index)}>Reveal Answer</button>
                        </div>
                    )}
                </div>
            ))}

            {/* Add extra space if the number of answers is greater than the number of questions */}
            {AnswerParts.length > QuestionParts.length && (
                <div className="answer">
                    <pre>{AnswerParts[QuestionParts.length]}</pre>
                    <button onClick={() => handleToggleAnswer(QuestionParts.length)}>Conceal Answer</button>
                </div>
            )}
        </div>
    );
};

export default QAGComponent;
