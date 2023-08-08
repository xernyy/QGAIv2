// pages/api/generateQuestions.js
import axios from 'axios';
const fs = require('fs');

function readDataFromFile(filePath) {
  const jsonDataRaw = fs.readFileSync(filePath, 'utf8');
  const parsedData = JSON.parse(jsonDataRaw);

  // Separate the data into sectionData and globalData
  const sectionData = {};
  const globalData = {};
  for (const key in parsedData) {
    if (key === "GLOSSARY" || key === "AIMS" || key === "FORMAT") {
      globalData[key] = parsedData[key];
    } else {
      sectionData[key] = parsedData[key];
    }
  }

  return { sectionData, globalData };
}

function generatePrompt(examinationBody, level, subject, questionType, section, sectionData, globalData) {
  section= section.replace(/ - .*/, "");
  const prompt = `
  Generate a question and its corresponding answer (Explain like a lecturer, but make sure a high school student can understand, include all working and be extensive in explanations) that aligns with the context that is added below.
  for an equation like this a2+2ab+b2, if the letter is directly followed by a number like this a2 then assume the 2 is an exponent but if it is be like this 2a assume it is being multiplied, do not use the equation as the basis for every question, Switch it up
  
  
  Examination Body: ${examinationBody}

  Level: ${level}

  Subject: ${subject}

  Question Type: ${questionType}

  When generating the question, ensure that question type is considered
  In multiple choice, one and only one should be the correct option



  AIM: ${globalData['AIMS']}



  Format of the Examinations: ${globalData['FORMAT']}




  Glossary: ${globalData['GLOSSARY']}



  ${section}: ${sectionData[section]}
  `;
  return prompt;
}

async function makeAPIRequest(prompt) {
  const url = 'https://api.openai.com/v1/chat/completions';

  const requestBody = {
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a professor and expert in your field, but have the ability to break something down very simply' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.1
  };

  try {
    const response = await axios.post(url, requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPEN_AI_API_KEY}`
      }
    });
    
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error(`Error with OpenAI API request: ${error.message}`);
    throw new Error('An error occurred during the request');
  }
}

function processAPIResponse(response) {
  const questionMarker = 'Question:';
  const answerMarker = 'Answer:';

  const questionIndex = response.indexOf(questionMarker);
  const answerIndex = response.indexOf(answerMarker);

  if (questionIndex !== -1 && answerIndex !== -1) {
    const question = response.slice(questionIndex + questionMarker.length, answerIndex);
    const answer = response.slice(answerIndex + answerMarker.length);

    return { question, answer };
  } else {
    return { question: response, answer: '' };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  try {
    // Extract user selections from 'req.body' and read data from file.
    const { examinationBody, level, subject, questionType, section } = req.body;
    const { sectionData, globalData } = readDataFromFile('Data collection/sections.json');
    
    // Generate the prompt.
    const prompt = generatePrompt(examinationBody, level, subject, questionType, section, sectionData, globalData);
    
    // Send the prompt to the GPT-4 API using your API request function.
    const response = await makeAPIRequest(prompt);

    // Receive and process the API response (sample questions and answers).
    const { question, answer } = processAPIResponse(response);

    // Return the response to the front-end.
    res.status(200).json({ Question: question, Answer: answer });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while generating questions.' });
  }
  
}
