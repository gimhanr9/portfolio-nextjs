"use client";

import { useState, useEffect } from "react";

interface ParticleDot {
  left: string;
  top: string;
  animationDelay: string;
  animationDuration: string;
}

const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const [particles, setParticles] = useState<ParticleDot[]>([]);

  useEffect(() => {
    const generatedParticles = [...Array(count)].map(() => ({
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 3}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
    }));
    setParticles(generatedParticles);
  }, [count]);

  if (particles.length === 0) {
    return <div className="absolute inset-0" />;
  }

  return (
    <div className="absolute inset-0">
      {particles.map((particle, i) => (
        <div
          key={i}
          className="absolute animate-pulse"
          style={{
            left: particle.left,
            top: particle.top,
            animationDelay: particle.animationDelay,
            animationDuration: particle.animationDuration,
          }}
        >
          <div className="w-1 h-1 bg-primary/30 rounded-full"></div>
        </div>
      ))}
    </div>
  );
};

export default FloatingParticles;
