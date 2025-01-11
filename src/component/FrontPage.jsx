import React, { useEffect, useRef, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const FrontPage = () => {
  const rat = useRef();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    // const a = document.querySelector(".query");
    // if (a) {
    //   a.classList.add("hidden");
    // }
  }, []);

  const handleClick = async () => {
    const answerSection = document.querySelector("#answerSection");
    const div = document.createElement("div");
    div.classList.add("query", "self-end", "bg-blue-500", "text-white", "p-3", "rounded-lg", "w-[60vw]", "md:w-[40vw]");
    div.innerText = inputValue;
    answerSection.appendChild(div);
   
    const genAI = new GoogleGenerativeAI("AIzaSyDieL-Miyg615JvzO4QPLg4yV0tnCZEyqY");// Use environment variable for the API key
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
    const prompt = inputValue;
    const ans = document.createElement("div");
    ans.classList.add("answer", "self-start", "bg-green-500", "text-white", "p-3", "rounded-lg", "w-[60vw]" ,"md:w-[40vw]")
   
    const result = await model.generateContent(prompt);
    ans.innerText=result.response.text();
    answerSection.appendChild(ans)
    console.log(result.response.text());
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="text-white bg-gray-900 flex justify-center items-center h-screen">
      <div className="container bg-gray-800 shadow-lg rounded-lg w-[90vw] md:w-[60vw] h-[90vh] p-4 overflow-y-auto">
        <div id="answerSection" className="flex flex-col space-y-4 overflow-y-auto h-[70vh] p-4 bg-gray-700 rounded-lg">
          <div className="query self-end bg-blue-500 text-white p-3 rounded-lg w-[60vw] md:w-[40vw]" ref={rat}>
            This is a query
          </div>
          <div className="answer self-start bg-green-500 text-white p-3 rounded-lg w-[60vw] md:w-[40vw]">
            This is an answer
          </div>
        </div>
        <div className="input flex mt-4">
          <input value={inputValue} onChange={handleChange} type="text" className="w-[85%] p-3 rounded-l-lg border-none focus:outline-none text-black" placeholder="Type your message..." />
          <button className="w-[15%] bg-blue-600 text-white p-3 rounded-r-lg" onClick={handleClick}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default FrontPage;
