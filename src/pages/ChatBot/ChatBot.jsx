import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { IoMenuOutline } from "react-icons/io5";
import { FaTimes } from "react-icons/fa";
// import he from "he";

const ChatBotUI = () => {
  const API_KEY = import.meta.env.VITE_GOOGLE_GENERATIVE_AI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);

  const [aiResponse, setAiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  /**
   * Generative AI Call to fetch text insights
   */
  async function aiRun(prompt) {
    setLoading(true);
    setAiResponse("");
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(` ${prompt}`);
      const responseText = result.response.text();
      setAiResponse(responseText);

      // Append AI response to messages
      const newMessages = [
        ...messages,
        { text: prompt, fromUser: true },
        { text: responseText, fromUser: false },
      ];
      setMessages(newMessages);
    } catch (error) {
      console.error("AI Error: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, fromUser: true }];
      setMessages(newMessages);
      aiRun(input); // Run AI after sending user message
      setInput(""); // Clear input after sending
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-full md:w-64 bg-gray-900 text-white flex flex-col ${
          isSidebarOpen ? "block" : "hidden md:block"
        }`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          KMA Bot
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="font-semibold text-gray-400 mb-4">Conversations</div>
          <ul>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">
              Conversation 1
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col w-full">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex justify-between items-center shadow-lg">
          <h2 className="text-lg font-semibold">Chat</h2>
          {/* Button to toggle sidebar */}
          <button
            className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <FaTimes /> : <IoMenuOutline />}
          </button>
        </div>

        {/* Logo Area */}
        <div
          className="flex justify-center text-center py-2 bg-blue-50 shadow-md"
          style={{ height: "10vh" }}
        >
          <div className="">
            <h1 className="text-3xl font-semibold text-blue-600">
              Health Bolt
            </h1>
            <p className="py-2 text-gray-600">Enter your symptoms</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.fromUser ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`${
                  message.fromUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } p-3 rounded-lg shadow-md max-w-xs lg:max-w-md break-words`}
                style={{ wordWrap: "break-word", overflowWrap: "break-word" }}
                // dangerouslySetInnerHTML={{ __html: he.decode(message.text) }}
                dangerouslySetInnerHTML={{
                  __html: message.text.replace(/\*/g, ""),
                }}
              />
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-gray-50">
          <form onSubmit={handleSendMessage} className="flex">
            <textarea
              className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              placeholder="Enter your symptoms..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600 shadow-md"
            >
              {loading ? "Loading..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
