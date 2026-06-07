import { useState, useEffect } from 'react';

export default function GreetingBlock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Checks the time every second
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Dynamic IANA US Eastern Configuration
  const easternZone = { timeZone: 'America/New_York' };

  // 2. Extract Weekday String
  const currentDay = currentTime.toLocaleDateString('en-US', {
    ...easternZone,
    weekday: 'long'
  });

  // 3. Format Time Output (Automatically shifts ±1 hour on transition Sundays at 2:00 AM)
  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    ...easternZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div className="d-flex justify-content-between align-items-center mb-4 pb-3 border-bottom">
      <div>
        <h1 className="fw-bold text-dark mb-0">Happy {currentDay}!</h1>
        <h3 className="text-muted mb-0 mt-1 fw-normal">You deserve to treat yourself!</h3>
      </div>

      {/*Clock Block */}
      <div className="text-end">
        <span className="fs-5 fw-bold text-success font-monospacepx-3 py-1">
            {formattedTime}
        </span>
      </div>
    </div>
  );
}
