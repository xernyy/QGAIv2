import React, { useState } from 'react';
import axios from 'axios';
import QAGComponent from './QAGComponent';;
import Navbar from './navbar';
const PromptGenerationComponent = () => {
  // Define ExaminationOptions object within the component

  const [generatedData, setGeneratedData] = useState(null);

  const ExaminationOptions = {
    examinationBodyToLevels: {
      "CXC": ["CSEC"],
    },
    levelToSubjects: {
      "CSEC": ["Maths"],
    },
    subjectToSections: {
      "Maths": ["SECTION 1 - COMPUTATION", "SECTION 2 - NUMBER THEORY", "SECTION 3 - CONSUMER ARITHMETIC", "SECTION 4 - SETS", "SECTION 5 - MEASUREMENT", "SECTION 6 - STATISTICS", "SECTION 7 - ALGEBRA", "SECTION 9 - GEOMETRY AND TRIGONOMETRY", "SECTION 10 - VECTORS AND MATRICES"],
    },
    subjectToQuestionTypes: {
      "Maths": ["Long Question", "Short Question", "Multiple Choice Question"]
    }
  };


  const [examinationBody, setExaminationBody] = useState('');
  const [level, setLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [section, setSection] = useState('');
  const [questionType, setQuestionType] = useState('');

  const handleExaminationBodyChange = (e) => {
    const examinationBodyValue = e.target.value;
    setExaminationBody(examinationBodyValue);
    setLevel('');
    setSubject('');
    setSection('');
    setQuestionType('');
  };

  const handleLevelChange = (e) => {
    const levelValue = e.target.value;
    setLevel(levelValue);
    setSubject('');
    setSection('');
    setQuestionType('');
  };

  const handleSubjectChange = (e) => {
    const subjectValue = e.target.value;
    setSubject(subjectValue);
    setSection('');
    setQuestionType('');
  };

  const handleGenerateQuestion = async () => {
    try {
      const response = await axios.post('/api/generateQuestions', {
        examinationBody,
        level,
        subject,
        section,
        questionType,
      });

      // Handle the response from the backend as desired
      const { Question, Answer } = response.data;
      setGeneratedData({ Question, Answer });
      console.log('Generated Question:', Question);
      console.log('Answer:', Answer);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Navbar/>
      <h1>Generate Questions</h1>
      <div>
        <label>Examination Body:
          <select value={examinationBody} onChange={handleExaminationBodyChange}>
            <option value="">Select...</option>
            {Object.keys(ExaminationOptions.examinationBodyToLevels).map((body) => (
              <option key={body} value={body}>{body}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Level:
          <select value={level} onChange={handleLevelChange}>
            <option value="">Select...</option>
            {examinationBody && ExaminationOptions.examinationBodyToLevels[examinationBody].map((level) => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Subject:
          <select value={subject} onChange={handleSubjectChange}>
            <option value="">Select...</option>
            {level && ExaminationOptions.levelToSubjects[level].map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Section:
          <select value={section} onChange={(e) => setSection(e.target.value)}>
            <option value="">Select...</option>
            {subject && ExaminationOptions.subjectToSections[subject].map((section) => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>Question Type:
          <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
            <option value="">Select...</option>
            {subject && ExaminationOptions.subjectToQuestionTypes[subject].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </label>
      </div>
      <button onClick={handleGenerateQuestion}>Generate Question</button>
      {/* Conditionally render the QAGComponent when generatedData is available */}
      {generatedData && (
        <QAGComponent question={generatedData.Question} answer={generatedData.Answer} />
      )}

    </div>
  );
};

export default PromptGenerationComponent;
