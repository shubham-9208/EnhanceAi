import { useEffect, useState } from "react";
import AnsSection from "./Components/AnsSection";
import SidePanel from "./Components/SidePanel";
import axios from 'axios'
import { GoogleGenerativeAI } from '@google/generative-ai';


function App() {
  const [question, setquestion] = useState('')
  const [previousAnsQ, setPreviousAnsQ] = useState([]);
  const [loading, setloading] = useState(false)

  //////////////////////////////////////////////////////////
  const [googleAI, setGoogleAI] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [chatstate, setchatstate] = useState(true)
  const apiKey = import.meta.env.VITE_API_KEY
  
  const chatTurn = () => {
    setchatstate((p) => !p)
  }

  //////////////////////////////////////////////////////

  useEffect(() => {
    if (!apiKey) {
      console.error('Please set REACT_APP_GEMINI_API_KEY environment variable');
      return;
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    setGoogleAI(genAI);
  }, [apiKey]);



  const sendMessageJS = async (e) => {
    e.preventDefault()
    
    setloading(true)
    if (!googleAI || !question) return;
    const model = googleAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: "my name is sam , i can give information only about frontend development\n",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const chatSession = model.startChat({
      generationConfig,
      history: chatHistory,
    });

    const result = await chatSession.sendMessage(question);
    
    setquestion('');
    setloading(false)
  };



  /////////////////////////////////////////////////////////////////////////

  const generateresponse = async (e) => {
    e.preventDefault()
    setPreviousAnsQ([])
    setloading(true)

    const response = await axios({
      url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
      method: 'POST',
      data: {
        contents: [
          {
            parts: [
              { text: question }
            ]
          }]
      },
    })
    const newAns = response["data"]["candidates"][0]["content"]["parts"][0]["text"]
    setPreviousAnsQ(prev => [...prev, { newAns, question }]);
    setquestion('')
    setloading(false)

  }


  /////////////////////////////////////////////////////////////////////////////////////////////


  return (
    <>
      <div className=' flex justify-center items-center bg-slate-500 h-screen w-screen' >
        <div className=' md:w-[70%] md:h-[85%]  md:rounded-2xl rounded-none bg-white flex md:flex-row flex-col-reverse w-[100%] h-[100%] '> 
          <SidePanel generateresponse={generateresponse} setPreviousAnsQ={setPreviousAnsQ} question={question}
            setquestion={setquestion} sendMessageJS={sendMessageJS} chatstate={chatstate} chatTurn={chatTurn} setChatHistory={setChatHistory}
          />
          <AnsSection previousAnsQ={previousAnsQ} loading={loading} chatstate={chatstate} chatHistory={chatHistory} />
        </div>
      </div>

    </>
  )
}

export default App;
