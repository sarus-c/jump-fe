import React from "react";

const Error = ({ handleError }: { handleError: () => void }) => (
  <div className="d-flex justify-content-center align-items-center p-5">
    <div
      className="alert alert-danger alert-dismissible fade show w-100"
      role="alert"
    >
      There was an error!
      <button
        type="button"
        className="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        onClick={handleError}
      ></button>
    </div>
  </div>
);

export default Error;
