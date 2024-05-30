import React from "react";

export const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center mt-4 h-100" style={{color:"var(--color-text)"}}>
      <div className="spinner-border align-items-center" role="status"
      style={{width:"5rem",height:"5rem"}}>
      </div>
    </div>
  );
};
