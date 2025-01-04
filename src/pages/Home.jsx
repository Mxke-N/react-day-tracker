import React, { useState, useCallback } from 'react';

import { ActivityProvider } from "../contexts/ActivityContext.jsx"
import StopwatchMain from "../components/StopwatchMain.jsx";
import ActivityMain from "../components/ActivityMain.jsx";

function Home() {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [timeAddedEvent, setTimeAddedEvent] = useState(false);

  function handleStopwatchUpdate(udpatedTime) {
    setStopwatchTime(udpatedTime);
  }

  const broadcastTimeAddedEvent = useCallback(() => {
    console.log("broadcastTimeAddedEvent called in Home");
    setTimeAddedEvent(true);
  }, []);

  function receivedTimeAddedEvent() {
    setTimeAddedEvent(false);
  }

  return (
    <>
      <StopwatchMain 
        onElapsedTimeUpdate={handleStopwatchUpdate}
        timeAddedEvent={timeAddedEvent}
        receivedTimeAddedEvent={receivedTimeAddedEvent}
      />
      <ActivityProvider 
        stopwatchTime={stopwatchTime}
        broadcastTimeAddedEvent={broadcastTimeAddedEvent}
      >
        <ActivityMain />
      </ActivityProvider>
    </>
  );
}

export default Home;