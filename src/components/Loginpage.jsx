import React, { useState, useEffect } from 'react';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Hey Buddy! Ready to leave a message for your future self?',
    'Don’t forget to use your email, human 👽',
    'Let’s time travel into your memories...',
  ];

  // Rotate messages after every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    if (onLogin && typeof onLogin === 'function') {
      onLogin(email); // Triggers login flow in App.jsx
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen text-white font-sans overflow-hidden">
      {/* Floating Robot + Static Rotating Messages */}
      <div className="absolute top-10 flex flex-col items-center z-50">
        <img
          src="/robot.gif"
          alt="Floating Robot"
          className="w-60 animate-float"
        />
        <div className="mt-3 px-4 py-2 rounded-lg bg-white/10 text-white text-sm sm:text-base text-center backdrop-blur-md border border-purple-500 shadow-lg max-w-xs">
          {messages[messageIndex]}
        </div>
      </div>

      {/* Login Box */}
      <div className="relative z-30 mt-64 flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-gray-300/20 rounded-xl p-8 w-full max-w-md shadow-xl animate-fade-in">
        <h2 className="text-2xl font-bold text-center mb-4 text-[#7f5af0]">
          🔐 Login
        </h2>

        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full p-3 rounded bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#7f5af0] transition-all mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-[#7f5af0] hover:bg-[#5b3ec4] transition-all text-white font-semibold py-2 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
