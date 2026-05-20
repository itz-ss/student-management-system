import React from "react";

export function ErrorState({ message = "Something went wrong." }) {
  return (
    <div className="status-state status-error">
      <p>{message}</p>
    </div>
  );
}
