import React, { useState, useEffect } from "react";

function PhoneTime() {
  const [time, setTime] = useState("00:00");

  const updateTime = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12; 
    }

    setTime(`${hours}:${minutes}`);
  };

  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="iphone-time">
      <h5>{time}</h5>
    </div>
  );
}

export default PhoneTime;