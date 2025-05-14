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

    const createFirework = () => {
      const firework = document.createElement('div');
      firework.className = 'firework';
      firework.style.left = `${Math.random() * 100}%`;
      firework.style.top = `${Math.random() * 50 + 50}%`;
      container.appendChild(firework);

      // Create particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.setProperty('--angle', `${(360 / 30) * i}deg`);
        particle.style.setProperty('--hue', `${Math.random() * 360}deg`);
        firework.appendChild(particle);
      }

      setTimeout(() => {
        firework.remove();
      }, 1000);
    };

    const shootingStarInterval = setInterval(createShootingStar, 4000);
    const sparkleInterval = setInterval(createSparkle, 500);
    const fireworkInterval = setInterval(createFirework, 3000);

    return () => {
      clearInterval(shootingStarInterval);
      clearInterval(sparkleInterval);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <div className="stars"></div>
    </div>
  );
}

export default MagicalBackground;