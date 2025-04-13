import React, { useState, useEffect } from 'react';

const getRandomCrashPoint = () => {
  return (Math.random() * 2 + 1).toFixed(2); // 1.00x to 3.00x
};

const AviatorGame = () => {
  const [crashPoint, setCrashPoint] = useState(null);
  const [currentMultiplier, setCurrentMultiplier] = useState(1.0);
  const [isFlying, setIsFlying] = useState(false);
  const [cashedOut, setCashedOut] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const startGame = () => {
    const crash = parseFloat(getRandomCrashPoint());
    setCrashPoint(crash);
    setCurrentMultiplier(1.0);
    setIsFlying(true);
    setCashedOut(false);

    const id = setInterval(() => {
      setCurrentMultiplier(prev => {
        const next = (prev + 0.1).toFixed(2);
        if (parseFloat(next) >= crash) {
          clearInterval(id);
          setIsFlying(false);
        }
        return parseFloat(next);
      });
    }, 500);

    setIntervalId(id);
  };

  const handleCashOut = () => {
    if (isFlying && !cashedOut) {
      clearInterval(intervalId);
      setIsFlying(false);
      setCashedOut(true);
    }
  };

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Mini Aviator Clone</h1>
      <div className="text-6xl font-bold mb-4">
        {isFlying ? `${currentMultiplier}x` : cashedOut ? `Cashed Out @ ${currentMultiplier}x` : 'Ready'}
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded text-xl"
          onClick={startGame}
          disabled={isFlying}
        >
          Start
        </button>
        <button
          className="bg-yellow-500 hover:bg-yellow-600 px-6 py-3 rounded text-xl"
          onClick={handleCashOut}
          disabled={!isFlying || cashedOut}
        >
          Cash Out
        </button>
      </div>
      {crashPoint && !isFlying && !cashedOut && (
        <p className="mt-4 text-red-400">Crashed at {crashPoint}x</p>
      )}
    </div>
  );
};

export default AviatorGame;