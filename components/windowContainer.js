import React, { useState, useRef, useEffect } from 'react';

const WindowContainer = ({ id, title, icon, children, onClose, onMinimize, initialPosition, isMinimized: initialIsMinimized }) => {
  const [position, setPosition] = useState(initialPosition || { x: 100, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [isMinimized, setIsMinimized] = useState(initialIsMinimized);
  const dragRef = useRef(null);
  const resizeRef = useRef(null);
  const windowRef = useRef(null);

  useEffect(() => {
    setIsMinimized(initialIsMinimized);
  }, [initialIsMinimized]);

  const handleMouseDown = (e) => {
    if (e.target.classList.contains('title-bar')) {
      setIsDragging(true);
      dragRef.current = {
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      };
    }
    if (e.target.classList.contains('resizer')) {
      setIsResizing(true);
      resizeRef.current = {
        x: e.clientX,
        y: e.clientY,
        width: size.width,
        height: size.height,
      };
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragRef.current.x,
        y: e.clientY - dragRef.current.y,
      });
    }
    if (isResizing) {
      setSize({
        width: resizeRef.current.width + (e.clientX - resizeRef.current.x),
        height: resizeRef.current.height + (e.clientY - resizeRef.current.y),
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  if (isMinimized) {
    return null; 
  }

  return (
    <div
      ref={windowRef}
      className="window-container"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="title-bar">
        <span>{title}</span>
        <div className="window-controls">
          <button onClick={onMinimize}>_</button>
          <button onClick={onClose}>X</button>
        </div>
      </div>
      <div className="content">
        {children}
      </div>
      <div className="resizer"></div>
    </div>
  );
};

export default WindowContainer;
