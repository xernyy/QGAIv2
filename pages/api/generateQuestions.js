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
    Examination Body: ${examinationBody}
    Level: ${level}
    Subject: ${subject}
    Question Type: ${questionType}

    AIM: ${globalData['AIMS']}

    Format of the Examinations: ${globalData['FORMAT']}

    Glossary: ${globalData['GLOSSARY']}

    ${section}: ${sectionData[section]}

    Generate a question and its corresponding answer that aligns with the provided context. The question should be tailored to the examination body, level, subject, and question type specified above.

    Ensure that the generated question and answer meet the following criteria:
    1. The question should be relevant to the subject and question type.
    2. The answer should be comprehensive and explanatory, suitable for a high school student's understanding.
    3. If the question context warrants it, the answer should include working steps, diagrams, graphs, or mathematical notation as needed.

    Additionally, use the following special tokens in the response to indicate specific elements:
    - [TABLE] for tables or data representations
    - [SHAPE] for shapes and diagrams
    - [MATH] for mathematical notation

    Feel free to include relevant examples, calculations, or scenarios that enhance the educational value of the question and answer pair.

    Please provide a detailed response that ensures a comprehensive explanation of the concept, making it accessible to high school students while covering all relevant aspects.
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
    console.log(process.env.OPEN_AI_API_KEY)
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
