'use client';

import { useState } from 'react';
import Taskbar from "@/components/taskbar";
import MatrixRain from "@/components/matrix";
import WindowContainer from '@/components/windowContainer';

const APPS = [
  { id: 1, title: 'Hello World', icon: '/minimal.png' },
];

export default function RootContainer() {
  const [windows, setWindows] = useState([]);

  const handleClose = (id) => {
    setWindows(windows.filter(w => w.id !== id));
  };

  const handleMinimize = (id) => {
    setWindows(windows.map(w => w.id === id ? { ...w, isMinimized: !w.isMinimized } : w));
  };

  const handleTaskbarClick = (appId) => {
    const existingWindow = windows.find(w => w.id === appId);

    if (existingWindow) {
      handleMinimize(appId);
    } else {
      const app = APPS.find(a => a.id === appId);
      if (app) {
        const newWindow = {
          ...app,
          isMinimized: false,
          initialPosition: { x: 150 + windows.length * 20, y: 150 + windows.length * 20 },
        };
        setWindows([...windows, newWindow]);
      }
    }
  };

  return (
    <html lang="en">
      <body>
        <MatrixRain />
        {windows.map(win => (
          <WindowContainer
            key={win.id}
            id={win.id}
            title={win.title}
            icon={win.icon}
            onClose={() => handleClose(win.id)}
            onMinimize={() => handleMinimize(win.id)}
            initialPosition={win.initialPosition}
            isMinimized={win.isMinimized}
          >
            <p>This is the content of the window with ID: {win.id}</p>
          </WindowContainer>
        ))}
        <Taskbar apps={APPS} openWindows={windows} onTaskbarClick={handleTaskbarClick} />
      </body>
    </html>
  );
}
