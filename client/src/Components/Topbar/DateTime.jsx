import React, { useState, useEffect } from 'react';

const DateTime = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const formattedDate = currentDate.toLocaleString();
  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
};
export default DateTime;
