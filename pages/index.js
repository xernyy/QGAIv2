import React from 'react';
import Head from 'next/head';
import PromptGenerationComponent from '../src/components/PromptGenerationComponent';


const Home = () => {
  return (
    <div>
      <Head>
        <title>Generate Questions</title>
        <meta name="description" content="Generate Questions Page" />
      </Head>
      <main>
        <PromptGenerationComponent />
      </main>
    </div>
  );
};

export default Home;
