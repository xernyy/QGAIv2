import Image from "next/image";
import Container from "./container";
import heroImg from "../../public/img/hero.png"
import AnimatedHeadline from "./AnimatedText"
import React, { useState } from "react";

const Hero = () => {

  return (
    <>
        
      
      <Container className="flex flex-wrap   items-center h-screen">
        <div className="mt-4 max-w-4xl w-full mb-8 px-4 z-0">
          <div >
            <AnimatedHeadline  />
          </div>

          <div className="py-5 text-base leading-normal text-gray-500 lg:text-lg xl:text-xl dark:text-gray-300 z-1">
            <ul className="list-none ">
              <li className="">
                From questions to mastery.
              </li>
            </ul>
          </div>  
                    

          <div className="mt-4">
            <button
              className="px-4 py-2 text-lg font-medium text-center text-white bg-customBlue rounded-md">
              Start Learning Now
              </button>
          </div>
          

        </div>
        <div className="absolute top-8/16 right-0 w-full lg:w-1/2 h-[50vh] flex justify-end items-center z-0">
            <Image
              src={heroImg}
              width={400} // Adjust the width to your needs
              height={400} // 
              alt="Hero Illustration"
              loading="eager"
              placeholder="blur"
              className="opacity-80 object-cover"
            />
          </div>

      </Container>
      <Container>
        <div className="flex flex-col justify-center">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Trusted by <span className="text-indigo-600">2000+</span>{" "}
            customers worldwide
          </div>

          
        </div>
      </Container>
    </>
  );
}



export default Hero;