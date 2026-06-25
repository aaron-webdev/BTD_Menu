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
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'center' }}>
      <h1 className="fw-bold text-dark mb-0 text-center">
        Happy {currentDay}!
      </h1>
      <h3 className="fw-bold text-dark mb-0 text-center">
        You deserve to treat yourself!
      </h3>
      <h3 className="fw-bold text-success font-monospace mb-0 text-center">
        {formattedTime}
      </h3>
    </div>
  );
}