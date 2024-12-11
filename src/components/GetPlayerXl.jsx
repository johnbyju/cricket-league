import React, { useEffect } from 'react';

function GetDataScheduler() {
  useEffect(() => {
    // Function to perform data collection
    const performDataCollection = async () => {
      try {
        const response = await fetch('https://marmaregisterformbe.onrender.com/getAllUsers/Throughbit@123');
        const data = await response.json();
        console.log('Data collected:', data);
        // You can perform additional actions with the data here
      } catch (error) {
        console.error('Error collecting data:', error);
      }
    };

    // Function to schedule the nightly task
    const scheduleNightlyTask = () => {
      const now = new Date();
      const targetTime = new Date();
      targetTime.setHours(23, 0, 0, 0); // 11:00 PM

      const timeToWait = targetTime - now;

      if (timeToWait > 0) {
        setTimeout(() => {
          performDataCollection();
        }, timeToWait);
      } else {
        
        setTimeout(() => {
          performDataCollection();
        }, timeToWait + 24 * 60 * 60 * 1000); 
      }
    };

    scheduleNightlyTask();
  }, []); 

  return (
    <div>
      <h1>Nightly Task Scheduler</h1>
      <p>This component will schedule a task to run at 11:00 PM every night.</p>
    </div>
  );
}

export default GetDataScheduler;
