import React, { useEffect, useRef, useState, useCallback } from 'react';

// Define the colors from your theme for consistency
const PRIMARY_DARK = '#0A0A0E'; // Deep charcoal blue
const NEON_GREEN = '#39FF14';   // Electric Lime Green
const RAIN_SPEED_FACTOR = 0.05; // Controls the speed of the rain. Smaller value = slower.

const MatrixRain = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0,  height: 0 });

  // Function to draw the matrix rain effect
  const drawMatrix = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions to fill the parent
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Characters to use for the rain (can be extended with more symbols)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const fontSize = 20; // Size of each character
    const columns = Math.floor(canvas.width / fontSize); // Number of columns

    // Array to store the y-position of each drop
    // Initialize drops with random starting Y-positions to avoid the initial line
    const drops = Array.from({ length: columns }, () => Math.random() * canvas.height / fontSize);

    // Set text properties
    ctx.font = `${fontSize}px monospace`; // Monospace font for that classic look
    ctx.fillStyle = NEON_GREEN; // The color of the falling characters

    // Animation loop
    const animate = () => {
      ctx.fillStyle = `rgba(${parseInt(PRIMARY_DARK.slice(1, 3), 16)}, ${parseInt(PRIMARY_DARK.slice(3, 5), 16)}, ${parseInt(PRIMARY_DARK.slice(5, 7), 16)}, 0.05)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Set the color for the new characters
      ctx.fillStyle = NEON_GREEN;

      // Loop through each drop
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment the y-position of the drop by the speed factor
        drops[i] += RAIN_SPEED_FACTOR;
      }

      requestAnimationFrame(animate); // Loop the animation
    };

    // Start the animation
    animate();
  }, [dimensions, PRIMARY_DARK, NEON_GREEN]); // Redraw if dimensions or colors change

  // Effect to set initial dimensions and handle window resizing
  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        setDimensions({
          width: canvasRef.current.parentElement.clientWidth,
          height: canvasRef.current.parentElement.clientHeight,
        });
      }
    };

    // Set initial dimensions
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup listener on component unmount
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Effect to start drawing when dimensions are ready
  useEffect(() => {
    if (dimensions.width > 0 && dimensions.height > 0) {
      drawMatrix();
    }
  }, [dimensions, drawMatrix]);

  return (
    <div
      style={{
        position: 'fixed', // Fixed position to cover the entire viewport
        top: 0,
        left: 0,
        width: '100vw', // Full viewport width
        height: '100vh', // Full viewport height
        overflow: 'hidden', // Hide any overflow
        backgroundColor: PRIMARY_DARK, // Set the background color
        zIndex: -1, // Ensure it stays behind other content
      }}
    >
      <canvas ref={canvasRef} />
    </div>
  );
};

export default MatrixRain;
