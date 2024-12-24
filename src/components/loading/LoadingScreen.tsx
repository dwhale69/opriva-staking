import React, { useEffect, useState } from 'react';

export const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [text, setText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [scale, setScale] = useState(1);
  const fullText = 'Welcome to Opriva terminal_';
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    const scaleInterval = setInterval(() => {
      setScale(prev => prev === 1 ? 1.1 : 1);
    }, 2000);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onLoadingComplete, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
      clearInterval(scaleInterval);
      clearInterval(progressInterval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#141416] flex items-center justify-center overflow-hidden">
      <div className="max-w-[90%] w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto px-4">
        <div 
          className="transition-transform duration-1000 ease-in-out text-center"
          style={{ transform: `scale(${scale})` }}
        >
          <div className="relative mb-8">
            <div 
              className="absolute inset-0 blur-lg opacity-50 bg-[#8396FA]" 
              style={{ transform: `scale(1.2)` }} 
            />
            <h1 className="text-[#8396FA] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-mono relative inline-block">
              {text}
              <span 
                className={`inline-block w-[0.1em] h-[1.2em] ml-1 align-middle bg-[#8396FA] ${
                  showCursor ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  boxShadow: '0 0 10px #8396FA, 0 0 20px #8396FA'
                }}
              />
            </h1>
          </div>

          <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto">
            <div className="h-2 bg-[#1f2023] rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#8396FA] transition-all duration-300 rounded-full"
                style={{ 
                  width: `${progress}%`,
                  boxShadow: '0 0 10px #8396FA'
                }}
              />
            </div>
            <div className="text-[#8396FA] font-mono text-sm sm:text-base md:text-lg">
              System Loading: {progress}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};