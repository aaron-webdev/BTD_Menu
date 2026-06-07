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
    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <div>
        <h1 className="fw-bold text-dark mb-0">Happy {currentDay}!</h1>
        <h3 className="text-muted mb-0 mt-1 fw-normal">You deserve to treat yourself!</h3>
      </div>
      {/* Clock Block */}
      <div className="text-end">
        <span className="fs-5 fw-bold text-success font-monospace px-3 py-1">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}