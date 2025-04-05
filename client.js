import React, { useState, useEffect } from "react";
import axios from "axios";

export default function LoveNotepad() {
  const [notes, setNotes] = useState([]);
  const [sender, setSender] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get("http://localhost:5000/api/notes");
    setNotes(res.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sender || !receiver || !message) return;
    await axios.post("http://localhost:5000/api/notes", {
      sender,
      receiver,
      message,
    });
    setMessage("");
    fetchNotes();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-pink-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 mt-8 border border-pink-200">
        <h1 className="text-2xl font-semibold text-pink-500 mb-4 text-center">
          💌 Love Notepad
        </h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            className="w-full p-2 border border-pink-200 rounded-xl bg-pink-100 placeholder-pink-400"
          />
          <input
            type="text"
            placeholder="Their Name"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full p-2 border border-pink-200 rounded-xl bg-pink-100 placeholder-pink-400"
          />
          <textarea
            placeholder="Write your love note here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full p-2 border border-pink-200 rounded-xl bg-pink-100 placeholder-pink-400 h-28 resize-none"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-pink-400 text-white font-bold py-2 rounded-xl hover:bg-pink-500 transition"
          >
            Send 💖
          </button>
        </form>
      </div>

      <div className="w-full max-w-md mt-6 space-y-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="bg-white border border-pink-200 rounded-xl p-4 shadow-sm"
          >
            <p className="text-pink-600 mb-1">{note.message}</p>
            <p className="text-sm text-pink-400">
              From <strong>{note.sender}</strong> to <strong>{note.receiver}</strong>
            </p>
            <p className="text-xs text-pink-300">
              {new Date(note.date).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
