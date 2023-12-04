import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <div className="d-flex flex-column justify-content-center align-items-center bg-dark text-white vh-100">
        <h1 className="display-1 font-weight-bold">404</h1>
        <div className="bg-danger px-2 text-sm rounded rotate-12 position-absolute">
          Page Not Found
        </div>
        <button className="mt-5">
          <Link to="/" className="btn btn-outline-danger">
            <span className="position-relative d-inline-block px-4 py-2 border border-dark">
              Go Home
            </span>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
