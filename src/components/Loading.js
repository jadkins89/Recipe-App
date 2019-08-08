import React from "react";

const Loading = props => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border mt-5" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
