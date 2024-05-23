import React from 'react'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Me</h1>
      <p className="text-gray-700 mb-6 text-lg">
        I am Sachin , A Undergrad at DELHI TECHNOLOGICAL UNIVERSITY, I  a dedicated and passionate programmer with a strong academic background and a zeal for competitive coding. I achieved a remarkable 98.4 percentile in the JEE Main examination, demonstrating my analytical and problem-solving skills. In my 12th board exams, I secured an impressive 94%, reflecting my commitment to academic excellence.
      </p>
      <p className="text-gray-700 mb-6 text-lg">
        My journey in programming is fueled by a profound love for coding and a constant drive to improve. On platforms like CodeChef, I have earned a 4-star rating, and on Codeforces, I am recognized as an Expert. Additionally, I have attained the title of Knight on LeetCode. These achievements are a testament to my persistent efforts, strategic thinking, and proficiency in tackling complex problems.
      </p>
      <p className="text-gray-700 mb-8 text-lg">
        I thrive in environments that challenge me to push the boundaries of my knowledge and skills. My passion for programming goes beyond just solving problems; I am deeply interested in understanding underlying algorithms and optimizing solutions. I look forward to contributing to innovative projects and collaborating with like-minded individuals to make a significant impact in the tech world.
      </p>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Achievements</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="font-semibold">JEE Main:</span> 98.4 percentile
        </li>
        <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="font-semibold">12th Board:</span> 94%
        </li>
        <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="font-semibold">CodeChef:</span> 4-star rating
        </li>
        <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="font-semibold">Codeforces:</span> Expert
        </li>
        <li className="bg-gray-100 p-4 rounded-lg shadow-sm">
          <span className="font-semibold">LeetCode:</span> Knight
        </li>
      </ul>
    </div>

  );

}

export default About