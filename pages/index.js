import React from 'react';
import Head from 'next/head';
import PromptGenerationComponent from '../src/components/PromptGenerationComponent';
import HomePageComponent from '../src/components/HomePageComponent'

const Home = () => {
  return (
    <div>
      <Head>
        <title>Generate Questions</title>
        <meta name="description" content="Generate Questions Page" />
      </Head>
      <main>
        <HomePageComponent/>
      </main>
    </div>
  );
};

export default Home;
