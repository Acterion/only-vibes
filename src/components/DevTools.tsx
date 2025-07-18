import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api";

export function DevTools() {
  const location = useLocation();
  const [apiStatus, setApiStatus] = useState<"checking" | "healthy" | "error">("checking");

  useEffect(() => {
    const checkApiHealth = async () => {
      try {
        await apiClient.getHealth();
        setApiStatus("healthy");
      } catch {
        setApiStatus("error");
      }
    };
    
    checkApiHealth();
  }, []);

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  const getApiStatusColor = () => {
    switch (apiStatus) {
      case "healthy": return "text-green-600";
      case "error": return "text-red-600";
      default: return "text-yellow-600";
    }
  };

  return (
    <div className="dev-tools">
      <h4>🔧 DevTools</h4>
      <p>
        <strong>Route:</strong>{" "}
        <span className="route">{location.pathname}</span>
      </p>
      <p>
        <strong>Phase:</strong> 2 - Database & API
      </p>
      <p>
        <strong>API:</strong>{" "}
        <span className={getApiStatusColor()}>
          {apiStatus === "checking" ? "..." : apiStatus}
        </span>
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
