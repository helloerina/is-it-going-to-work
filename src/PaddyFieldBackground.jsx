import React, { useEffect, useRef } from 'react';

export const PaddyFieldBackground = () => {
  const canvasRef = useRef(null);
  const backgroundCanvasRef = useRef(null); // For static background

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a hidden canvas for the static background
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d');

    let cloudOffset = 0;

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      bgCanvas.width = canvas.width;
      bgCanvas.height = canvas.height;
      drawStaticBackground();
    };

    const drawStaticBackground = () => {
      const pixelSize = 8;
      const cols = Math.ceil(bgCanvas.width / pixelSize);
      const rows = Math.ceil(bgCanvas.height / pixelSize);

      const skyColors = ['#87CEEB', '#5FB3E8', '#74C0ED', '#6BB8E8'];
      const mountainColors = ['#4A7C59', '#3D6B4A', '#5A8C6B'];
      const paddyGreen = ['#7CB342', '#8BC34A', '#689F38', '#9CCC65'];
      const waterBlue = ['#4FC3F7', '#29B6F6', '#03A9F4', '#0288D1'];
      const darkGreen = ['#558B2F', '#33691E', '#1B5E20'];

      // Draw sky (top 40%) - STATIC
      for (let y = 0; y < rows * 0.4; y++) {
        for (let x = 0; x < cols; x++) {
          const color = skyColors[Math.floor(Math.random() * skyColors.length * 0.3)];
          bgCtx.fillStyle = color || skyColors[0];
          bgCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }

      // Draw mountains (40-50%) - STATIC
      for (let x = 0; x < cols; x++) {
        const mountainHeight = Math.sin(x * 0.3) * 3 + Math.cos(x * 0.5) * 2;
        const startY = rows * 0.4;
        for (let y = 0; y < mountainHeight + 3; y++) {
          bgCtx.fillStyle = mountainColors[Math.floor(Math.random() * mountainColors.length)];
          bgCtx.fillRect(x * pixelSize, (startY + y) * pixelSize, pixelSize, pixelSize);
        }
      }

      // Draw paddy fields (50-100%) - STATIC
      const paddyStartRow = Math.floor(rows * 0.5);
      
      for (let y = paddyStartRow; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const isWaterRow = (y % 6 < 2);
          const isBorder = (y % 6 === 0 || y % 6 === 2);
          
          let color;
          if (isBorder) {
            color = darkGreen[Math.floor(Math.random() * darkGreen.length)];
          } else if (isWaterRow) {
            color = Math.random() > 0.7 
              ? waterBlue[Math.floor(Math.random() * waterBlue.length)]
              : waterBlue[0];
          } else {
            color = paddyGreen[Math.floor(Math.random() * paddyGreen.length)];
          }
          
          bgCtx.fillStyle = color;
          bgCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }

      // Add texture details - STATIC
      for (let i = 0; i < (cols * rows) / 20; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * (rows - paddyStartRow)) + paddyStartRow;
        
        if (y % 6 >= 2) {
          bgCtx.fillStyle = darkGreen[0];
          bgCtx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      }
    };

    const drawClouds = () => {
      const pixelSize = 8;
      const cols = Math.ceil(canvas.width / pixelSize);
      
      const cloudColor = '#FFFFFF';

      const drawCloud = (startX, startY) => {
        const cloudPixels = [
          [0, 1], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2], [3, 1]
        ];
        cloudPixels.forEach(([dx, dy]) => {
          ctx.fillStyle = cloudColor;
          const drawX = ((startX + dx) * pixelSize + cloudOffset) % canvas.width;
          ctx.fillRect(drawX, (startY + dy) * pixelSize, pixelSize, pixelSize);
        });
      };

      drawCloud(5, 3);
      drawCloud(15, 5);
      drawCloud(cols - 10, 4);
      drawCloud(cols - 20, 2);
    };

    const animate = () => {
      // Draw static background first
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(bgCanvas, 0, 0);
      
      // Then draw moving clouds on top
      cloudOffset += 0.2; // Slow, gentle drift
      if (cloudOffset >= canvas.width) {
        cloudOffset = 0;
      }
      drawClouds();
      
      requestAnimationFrame(animate);
    };

    updateSize();
    animate();
    window.addEventListener('resize', updateSize);

    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10"
      style={{ imageRendering: 'pixelated' }}
    />
  );
};
