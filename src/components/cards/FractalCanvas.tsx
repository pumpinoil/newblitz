import React, { useEffect, useRef } from 'react';

interface FractalCanvasProps {
  iterations?: number;
}

const FractalCanvas: React.FC<FractalCanvasProps> = ({ iterations = 5 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Basic fractal drawing logic would go here
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [iterations]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-lg" />;
};

export default FractalCanvas;