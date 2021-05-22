import React from "react";

const Info = ({msg}: ({msg?: string})) => (
  <div className="d-flex justify-content-center align-items-center pt-3">
    <div
      className="alert alert-success w-100 mb-0"
      role="alert"
    >
      {msg || 'The operation was successfully done!'}
    </div>
  </div>
);

export default Info;
