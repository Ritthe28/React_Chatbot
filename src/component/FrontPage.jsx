import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const FrontPage = () => {
  const rat = useRef();
  const answerSectionRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Example useEffect for hiding an element (if needed)
    // const a = document.querySelector(".query");
    // if (a) {
    //   a.classList.add("hidden");
    // }
  }, []);

  const handleClick = async () => {
    const answerSection = answerSectionRef.current;
    const div = document.createElement("div");
    div.classList.add("query", "self-end", "bg-blue-500", "text-white", "p-3", "rounded-lg", "w-full", "max-w-[60vw]", "md:max-w-[40vw]");
    div.innerText = inputValue;
    answerSection.appendChild(div);

    // Scroll to the prompt only
    div.scrollIntoView({
      behavior: 'smooth',
      block: 'end'
    });

    setIsLoading(true);

    // Delay the loading message appearance
    setTimeout(async () => {
      const genAI = new GoogleGenerativeAI("AIzaSyDieL-Miyg615JvzO4QPLg4yV0tnCZEyqY"); // Use environment variable for the API key
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
      const prompt = inputValue;
      const ans = document.createElement("div");
      ans.classList.add("answer", "self-start", "bg-green-500", "text-white", "p-3", "rounded-lg", "w-full", "max-w-[60vw]", "md:max-w-[40vw]");

      const result = await model.generateContent(prompt);
      ans.innerText = result.response.text();
      answerSection.appendChild(ans);

      // Scroll to the new answer partially
      ans.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });

      setIsLoading(false);
    }, 1000); // 1-second delay
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="text-white bg-gray-900 flex justify-center items-center h-screen">
      <div className="container bg-gray-800 shadow-lg rounded-lg w-full max-w-[90vw] md:max-w-[60vw] h-[90vh] p-4 overflow-y-auto">
        <div id="answerSection" ref={answerSectionRef} className="flex flex-col space-y-4 overflow-y-auto h-[70vh] p-4 bg-gray-700 rounded-lg scrollbar-hide">
          <div className="bg-gray-600 text-white p-3 rounded-lg w-full flex justify-center items-center">
            Search anything you want
          </div>
          {isLoading && (
            <div className="loading self-start bg-yellow-500 text-white p-3 rounded-lg w-full max-w-[60vw] md:max-w-[40vw]">
              Loading...
            </div>
          )}
        </div>
        <div className="input flex mt-4">
          <input value={inputValue} onChange={handleChange} type="text" className="w-[85%] p-3 rounded-l-lg border-none focus:outline-none text-black" placeholder="Type your message..." />
          <button className="w-[15%] bg-blue-600 text-white p-3 rounded-r-lg" onClick={handleClick}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
