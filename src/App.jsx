import React, { useState } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import LoginPage from './components/Loginpage';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
  };

  const handleLogout = () => {
    setUserEmail('');
  };

  return (
    <div className="relative min-h-screen font-orbitron text-white overflow-hidden">
      {/* Animated background which stays behind on all loginpage and after login message form page*/}
      <AnimatedBackground />

      {!userEmail ? (
        <div className="relative z-10">
          <LoginPage onLogin={handleLogin} />
        </div>
      ) : (
        <div className="relative z-50 p-6">
          {/* Header with Logout */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-[#7f5af0] drop-shadow-lg">
              DreamBack: AI Time Capsule
            </h1>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
            >
              Logout
            </button>
          </div>

          {/* Message Form and List */}
          <MessageForm userEmail={userEmail} />
          <hr className="my-10 border-gray-600" />
          <MessageList userEmail={userEmail} />
        </div>
      )}
    </div>
  );
}

export default App;
