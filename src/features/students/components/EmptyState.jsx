import React from "react";

export function EmptyState({ message = "No results available." }) {
  return (
    <div className="status-state status-empty">
      <p>{message}</p>
    </div>
  );
}
