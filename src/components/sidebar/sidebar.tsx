import React from "react";
import Icon from "../icon";
import "./sidebar.css";

const Sidebar = () => (
  <aside className="d-flex flex-column" data-testid="sidebar">
    <a
      href="/"
      className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
    >
      <Icon icon="boot" />
      <span className="fs-4 ms-2">Jump</span>
    </a>
    <hr />
    <p>Jump is a web simple scraper.<br />The BackEnd is a Node+Express server.<br />The FrontEnd is a React app.<br />The service that gets the info is a Python app.</p>
  </aside>
);

export default Sidebar;
