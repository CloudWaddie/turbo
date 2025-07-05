import Image from "next/image";

export default function Taskbar({ apps, openWindows, onTaskbarClick }) {
  return (
    <div className="taskbar">
      <div className="taskbar-left">
        <Image
          src="/minimal.png"
          alt="Turbo OS Logo"
          width={64}
          height={64}
          className="h-8 w-8 object-contain"
        />
      </div>
      <div className="taskbar-center">
        <div className="taskbar-items">
          {apps.map(app => {
            const openWindow = openWindows.find(w => w.id === app.id);
            let stateClass = 'closed';
            if (openWindow) {
              stateClass = openWindow.isMinimized ? 'minimized' : 'open';
            }

            return (
              <button key={app.id} onClick={() => onTaskbarClick(app.id)} className={`taskbar-item ${stateClass}`}>
                <Image
                  src={app.icon}
                  alt={app.title}
                  width={32}
                  height={32}
                  className="h-6 w-6 object-contain"
                />
              </button>
            );
          })}
        </div>
      </div>
      <div className="taskbar-right">
        <span className="material-symbols-outlined cursor-pointer">notifications</span>
        <span className="material-symbols-outlined cursor-pointer">settings</span>
      </div>
    </div>
  );
}
