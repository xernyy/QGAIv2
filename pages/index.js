import React from 'react';
import Head from 'next/head';
import PromptGenerationComponent from '../src/components/PromptGenerationComponent';
import LandingPage from '../src/components/LandingPage';

const Home = () => {
  return (
    <>
    <Head>
      <title>Sage AI- Acquisition, Understanding, Application, Adaptation</title>
        <meta
          name="description"
          content="Sage Ai: Guiding Your Journey from Knowledge to Mastery"
        />
      <link rel="icon" href="/img/logo.png" />
    ` </Head>
    <div>
      <main>
        <LandingPage/>
      </main>
    </div>
    </>
  );
};

export default Home;
