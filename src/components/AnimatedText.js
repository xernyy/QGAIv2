import React, { useRef, useEffect } from 'react';
import Typed from 'typed.js';

const AnimatedHeadline = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const sentences = [  // Move this array declaration above the useEffect
      "Personalized Learning Paths",
      "Smart Content Curation",
      "Data-Driven Progress Tracking",
      "Adaptive Learning Techniques",
      "Powered by AI"
    ];

    const options = {
      strings: sentences,
      typeSpeed: 20,      // Typing speed in milliseconds
      backSpeed: 20,      // Backspacing speed in milliseconds
      backDelay: 2000,    // Delay before backspacing starts
      startDelay: 500,    // Delay before typing starts
      loop: true,         // Loop the animation
      showCursor: false,   // Show the blinking cursor
    };

    const typed = new Typed(typedRef.current, options);

    return () => {
      typed.destroy();   // Cleanup on unmount
    };
  }, []);  // Removed sentences from the dependency array

  return (
    <h1 ref={typedRef} className="text-5xl font-bold leading-snug tracking-tight text-gray-800 lg:text-7xl lg:leading-tight xl:text-8xl xl:leading-tight dark:text-white"></h1>

  );
};

export default AnimatedHeadline;
