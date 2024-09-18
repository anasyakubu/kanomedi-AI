import { useState } from "react";

const ChatBotUI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessages = [...messages, { text: input, fromUser: true }];
      setMessages(newMessages);
      setInput("");

      // Simulate bot reply after a short delay
      setTimeout(() => {
        const botReply = {
          text: `Bot: You said "${input}"`, // Customize bot reply logic here
          fromUser: false,
        };
        setMessages((prevMessages) => [...prevMessages, botReply]);
      }, 1000);
    }
  };

  // Toggle Sidebar
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
          ChatGPT Bot
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <div className="font-semibold text-gray-400 mb-4">Conversations</div>
          <ul>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">
              Conversation 1
            </li>
            <li className="p-2 hover:bg-gray-700 cursor-pointer">
              Conversation 2
            </li>
          </ul>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-col w-full">
        {/* Chat Header */}
        <div className="bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Chat</h2>
          {/* Button to toggle sidebar */}
          <button
            className="md:hidden bg-gray-800 text-white px-4 py-2 rounded-lg"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? "Hide Conversations" : "Show Conversations"}
          </button>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex ${
                message.fromUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`${
                  message.fromUser
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                } p-3 rounded-lg max-w-xs mb-2`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              className="flex-1 border rounded-l-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBotUI;
