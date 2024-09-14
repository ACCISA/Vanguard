import React, { useEffect, useState } from 'react';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress(progress + 1);
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <div className="w-full h-4 bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 rounded-lg relative overflow-hidden">
      <div
        className="h-full bg-slate-500 rounded-lg"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 opacity-50"></div>
    </div>
  );
};

export default ProgressBar;
