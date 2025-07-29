import React from 'react';

function RobotGuide() {
  return (
    <div className="flex flex-col items-center mb-6 animate-fade-in">
      <img
        src="/robot.gif" 
        alt="Robot Guide"
        className="w-28 md:w-32 lg:w-40 animate-bounce"
      />
    </div>
  );
}

export default RobotGuide;
