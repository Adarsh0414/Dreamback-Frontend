import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MessageList({ userEmail }) {
  const [locked, setLocked] = useState([]);
  const [unlocked, setUnlocked] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    if (!userEmail) return;

    try {
      const res = await axios.get(`http://localhost:5001/api/messages/${userEmail}`);
      const allMessages = res.data.data || [];

      const now = new Date();
      const lockedMsgs = allMessages.filter(msg => !msg.isUnlocked);
      const unlockedMsgs = allMessages.filter(msg => msg.isUnlocked && new Date(msg.unlockDate) <= now);

      setLocked(lockedMsgs);
      setUnlocked(unlockedMsgs);
    } catch (err) {
      console.error("Error fetching user messages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    const interval = setInterval(() => {
      fetchMessages();
    }, 10000); // refresh webpage after every 10 seconds

    return () => clearInterval(interval);
  }, [userEmail]);

  if (loading) {
    return <p className="text-center text-gray-400">Loading your messages...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Locked Messages provided by the user */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-[#fca5a5]">🔒 Locked Messages</h2>
        {locked.length === 0 ? (
          <p className="text-sm italic text-gray-500">No locked messages.</p>
        ) : (
          <div className="grid gap-4">
            {locked.map(msg => (
              <div key={msg._id} className="bg-[#111827] border border-gray-700 rounded-lg p-4 shadow-inner text-white">
                <p className="text-sm text-pink-400">📧 {msg.email}</p>
                <p className="text-sm italic text-yellow-300">Unlocks: {new Date(msg.unlockDate).toLocaleString()}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Unlocked Messages provided by the user and it's set up time to open is completed */}
      <section>
        <h2 className="text-xl font-bold mb-4 text-[#86efac]">🔓 Unlocked Messages</h2>
        {unlocked.length === 0 ? (
          <p className="text-sm italic text-gray-500">No unlocked messages yet.</p>
        ) : (
          <div className="grid gap-4">
            {unlocked.map(msg => (
              <div
                key={msg._id}
                className="bg-gradient-to-br from-[#232526] to-[#414345] border border-gray-600 rounded-lg p-4 text-white shadow-lg"
              >
                <p className="text-sm text-violet-400">📨 From: {msg.email}</p>
                <p className="mt-2 text-white/90">{msg.message}</p>

                {msg.evolvedMessage && (
                  <div className="mt-3 border-t pt-2 border-gray-500">
                    <p className="text-green-400 font-semibold">AI Evolved Message:</p>
                    <p className="text-sm text-gray-300 mt-1">{msg.evolvedMessage}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default MessageList;
