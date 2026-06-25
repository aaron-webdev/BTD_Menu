import { useState, useEffect } from 'react';

export default function GreetingBlock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const easternZone = { timeZone: 'America/New_York' };

  const currentDay = currentTime.toLocaleDateString('en-US', {
    ...easternZone,
    weekday: 'long',
  });

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    ...easternZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  });

  return (
    <div className="d-flex justify-content-between align-items-center w-200">
      <h1 className="fw-bold text-dark mb-0 flex-grow-1 text-center">
        Happy {currentDay}! &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        You deserve to treat yourself!
      </h1>
      <span className="fs-1 fw-bold text-success font-monospace px-3 py-1 text-nowrap">
        {formattedTime}
      </span>
    </div>
  );
}