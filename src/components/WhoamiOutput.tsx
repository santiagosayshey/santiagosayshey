import React, { useState, useEffect } from "react";

const WhoamiOutput: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div
      className={`
        space-y-1 
        transition-all duration-300 ease-out
        ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
      `}
    >
      <div>Hey there! 👋</div>
      <div>
        I'm Sam, a final year computer science student at the University of
        Adelaide with a passion for all things self hosting! 🌐
      </div>
    </div>
  );
};

export default WhoamiOutput;
