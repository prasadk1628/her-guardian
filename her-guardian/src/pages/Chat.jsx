import { useState } from "react";

export default function Chat() {

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      text: "Welcome to Her Guardian support chat.",
    },
    {
      id: 2,
      sender: "support",
      text: "How can we help you today?",
    },
  ]);

  function handleSend() {

    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: message,
    };

    setMessages([...messages, newMessage]);

    setMessage("");
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-24 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-pink-100 p-4 shadow-sm">

        <h1 className="text-2xl font-bold text-pink-600">
          Support Chat
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Connect with the Her Guardian community.
        </p>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.map((msg) => (

          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                msg.sender === "user"
                  ? "bg-pink-600 text-white rounded-br-sm"
                  : "bg-white border border-pink-100 text-gray-700 rounded-bl-sm"
              }`}
            >
              {msg.text}
            </div>

          </div>

        ))}

      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-pink-100 p-4">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border border-pink-200 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            onClick={handleSend}
            className="bg-pink-600 hover:bg-pink-700 text-white px-5 rounded-2xl font-medium transition"
          >
            Send
          </button>

        </div>

      </div>

    </div>
  );
}