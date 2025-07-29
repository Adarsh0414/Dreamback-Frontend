import React, { useState } from 'react';
import axios from 'axios';

function MessageForm({ userEmail }) {
  const [content, setContent] = useState('');
  const [unlockAt, setUnlockAt] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || !unlockAt) {
      alert("Please write a message and select a date.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5001/api/messages', {
        email: userEmail,
        message: content,
        unlockDate: unlockAt,
      });

      console.log('✅ Response:', response.data); // Debug line
      alert('🎉 Message locked successfully!');
      setContent('');
      setUnlockAt('');
    } catch (err) {
      console.error("❌ Error submitting message:", err); // Debug
      alert('Failed to save message. Check console for errors.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 max-w-2xl mx-auto space-y-5 text-white"
    >
      <h2 className="text-xl font-semibold tracking-wide text-center text-white/80">
        Send a Message to Your Future
      </h2>

      {/* Email Display */}
      <input
        type="email"
        value={userEmail}
        disabled
        className="w-full p-3 rounded-xl bg-white/10 text-white/60 cursor-not-allowed"
      />

      <textarea
        placeholder="Write your message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 placeholder-white/50 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
        rows="4"
        required
      />

      <input
        type="datetime-local"
        value={unlockAt}
        onChange={(e) => setUnlockAt(e.target.value)}
        className="w-full p-3 rounded-xl bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-violet-400"
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-violet-600 hover:bg-violet-700 rounded-xl font-bold text-white transition duration-300"
      >
        Lock Message 🔒
      </button>
    </form>
  );
}

export default MessageForm;
