import React from 'react';
import Link from 'next/link';

const FeatureCard = ({ imageSrc, href, name, description }) => {
  return (
    <Link href={href}>
      <div className="border border-gray-300 bg-gray-100 rounded-xl shadow-lg p-4 mb-8 hover:bg-indigo-100 transition duration-300 ease-in-out cursor-pointer">
        <div className="flex items-start flex-col sm:flex-row">
          <div className="mr-2 mb-4 sm:mb-0">
            <img src={imageSrc} alt={name} className="h-44 object-contain" />
          </div>
          <div className="mt-4 sm:mt-10">
            <div className="font-bold text-base leading-normal text-gray-500 text-2xl sm:text-4xl">
              {name}
            </div>
            <div className="text-gray-400 font-semibold text-sm mt-2 sm:mt-4">
              {description}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default FeatureCard;
