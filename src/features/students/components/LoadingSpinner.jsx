import React from "react";

export function LoadingSpinner() {
  return (
    <div className="status-state status-loading">
      <div className="spinner" />
      <span>Loading student records…</span>
    </div>
  );
}
