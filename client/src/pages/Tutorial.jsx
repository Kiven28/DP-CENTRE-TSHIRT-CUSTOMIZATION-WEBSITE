import React from 'react';
import { Link } from 'react-router-dom';
import backgroundImage from '../assets/ss.jpg'; // Importing the background image

const TutorialPage = () => {
  const steps = [
    {
      title: "Color Setup",
      content: "Select your favourite color for the T-shirt.",
      icon: "🎨"
    },
    {
      title: "Upload Logo",
      content: "Drop your intended logo for your T-Shirt from the window.",
      icon: "🖌️"
    },
    {
      title: "AI Designing",
      content: "Drop your intended design description in the AI Chatbox.",
      icon: "✏️"
    },
    {
      title: "'Save' your customized T-Shirt",
      content: "Click the 'Save' button to export your design.",
      icon: "💡"
    }
  ];

  return (
    <section className="min-h-screen">
      <div className="max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-yellow-500 border-b pb-2">TUTORIAL</h1>
          <Link to="/" className="text-black shadow-lg shadow-yellow-500/50 hover:shadow-none bg-yellow-500 w-fit px-4 py-2 font-bold text-xs customize-button rounded transition duration-300">
            GO BACK
          </Link>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="tutorial-heading text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">T-Shirt Customizing Steps</h1>
          <div className="grid grid-cols-1 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="tutorial-step shadow-sm shadow-yellow-500 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300">
                <div className="flex items-center">
                  <div className="step-icon bg-blue-500 dark:text-white rounded-full p-3 text-2xl mr-4">{step.icon}</div>
                  <div>
                    <h2 className="step-heading text-xl font-bold mb-2 text-yellow-500">{`${index + 1}. ${step.title}`}</h2>
                    <p className="text-sm text-white">{step.content}</p>
                  </div>
                </div>
              </div>
            ))}
            {/* Call to Action: Try It Now */}
            <div className="tutorial-step shadow-sm shadow-yellow-500 rounded-lg shadow-lg p-6 transform hover:scale-105 transition duration-300 flex flex-col items-center justify-center text-center">
              <h2 className="step-heading text-2xl font-bold mb-4 text-yellow-500">So What Are You Waiting For?</h2>
              <p className="text-lg text-white">Let's Customize It!</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TutorialPage;
