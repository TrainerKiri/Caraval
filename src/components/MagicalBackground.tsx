import React, { useEffect, useRef } from 'react';

function MagicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createShootingStar = () => {
      const star = document.createElement('div');
      star.className = 'shooting-star';
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = '-100px';
      container.appendChild(star);

      star.addEventListener('animationend', () => {
        star.remove();
      });
    };

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.top = `${Math.random() * 100}%`;
      sparkle.style.left = `${Math.random() * 100}%`;
      container.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 1500);
    };

    const shootingStarInterval = setInterval(createShootingStar, 4000);
    const sparkleInterval = setInterval(createSparkle, 500);

    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(sparkleInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <div className="stars"></div>
    </div>
  );
}

export default MagicalBackground;