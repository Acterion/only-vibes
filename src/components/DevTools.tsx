import { useLocation } from "react-router-dom";

export function DevTools() {
  const location = useLocation();

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="dev-tools">
      <h4>🔧 DevTools</h4>
      <p>
        <strong>Route:</strong>{" "}
        <span className="route">{location.pathname}</span>
      </p>
      <p>
        <strong>Phase:</strong> 1 - Scaffold & SPA
      </p>
      <p>
        <strong>Mode:</strong> {import.meta.env.MODE}
      </p>
      <p>
        <strong>Build:</strong> {new Date().toLocaleTimeString()}
      </p>
    </div>
  );
}
