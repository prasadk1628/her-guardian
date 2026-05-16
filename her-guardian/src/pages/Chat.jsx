import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "../firebase/config";

import { useAuth } from "../context/AuthContext";

export default function Chat() {

  const { user } = useAuth();

  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([]);

  // Realtime listener
  useEffect(() => {

    const messagesRef = collection(
      db,
      "communityMessages"
    );

    const q = query(
      messagesRef,
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {

        const fetchedMessages =
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

        setMessages(fetchedMessages);
      }
    );

    return () => unsubscribe();

  }, []);

  // Send message
  async function handleSend() {

    if (!message.trim()) return;

    const messagesRef = collection(
      db,
      "communityMessages"
    );

    await addDoc(messagesRef, {
      text: message,
      senderName:
        user?.displayName || "Anonymous",
      senderId: user.uid,
      createdAt: serverTimestamp(),
    });

    setMessage("");
  }

  return (
    <div className="min-h-screen bg-pink-50 pb-24 flex flex-col">

      {/* Header */}
      <div className="bg-white border-b border-pink-100 p-4 shadow-sm">

        <h1 className="text-2xl font-bold text-pink-600">
          Community Room
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          A supportive space for safety and discussion.
        </p>

      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">

        {messages.length === 0 ? (

          <div className="text-center text-gray-500 mt-10">
            No messages yet.
          </div>

        ) : (

          messages.map((msg) => {

            const isCurrentUser =
              msg.senderId === user.uid;

            return (

              <div
                key={msg.id}
                className={`flex ${
                  isCurrentUser
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow-sm ${
                    isCurrentUser
                      ? "bg-pink-600 text-white rounded-br-sm"
                      : "bg-white border border-pink-100 text-gray-700 rounded-bl-sm"
                  }`}
                >

                  {!isCurrentUser && (

                    <p className="text-xs font-semibold text-pink-500 mb-1">
                      {msg.senderName}
                    </p>

                  )}

                  <p>
                    {msg.text}
                  </p>

                  {msg.createdAt?.seconds && (

                    <p
                      className={`text-[10px] mt-2 ${
                        isCurrentUser
                          ? "text-pink-100"
                          : "text-gray-400"
                      }`}
                    >
                      {new Date(
                        msg.createdAt.seconds * 1000
                      ).toLocaleTimeString()}
                    </p>

                  )}

                </div>

              </div>

            );
          })

        )}

      </div>

      {/* Input */}
      <div className="bg-white border-t border-pink-100 p-4">

        <div className="flex gap-3">

          <input
            type="text"
            placeholder="Share something supportive..."
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