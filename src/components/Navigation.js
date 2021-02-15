import React from "react";
import { Nav, NavItem } from "reactstrap";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faUserCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

import "../App.css";

const tabs = [
  {
    route: "/home",
    icon: faHome,
    label: "Home",
  },
  {
    route: "/suggest",
    icon: faPlus,
    label: "Suggest",
  },
  {
    route: "/schedule",
    icon: faSearch,
    label: "Schedule",
  },
  // {
  //   route: "/profile",
  //   icon: faUserCircle,
  //   label: "Profile",
  // },
];

const Navigation = (props) => {
  return (
    <div>
      {/* Top Bar*/}
      <nav
        className="navbar navbar-expand-md navbar-light d-none d-lg-block sticky-top"
        role="navigation"
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/home">
            🎶
          </a>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink to="/schedule" className="nav-link">
                Schedule
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/suggest" className="nav-link">
                Suggest
              </NavLink>
            </NavItem>
            {/* <NavItem>
              <NavLink to="/profile" className="nav-link">
                Profile
              </NavLink>
            </NavItem> */}
          </Nav>
        </div>
      </nav>

      {/* Bottom Tab Navigator*/}
      <nav
        className="navbar fixed-bottom navbar-light d-block d-lg-none bottom-tab-nav"
        role="navigation"
      >
        <Nav className="w-100">
          <div className=" d-flex flex-row justify-content-around w-100">
            {tabs.map((tab, index) => (
              <NavItem key={`tab-${index}`}>
                <NavLink
                  to={tab.route}
                  className="nav-link bottom-nav-link"
                  activeClassName="active"
                >
                  <div className="row d-flex flex-column justify-content-center align-items-center">
                    <FontAwesomeIcon size="lg" icon={tab.icon} />
                    <div className="bottom-tab-label">{tab.label}</div>
                  </div>
                </NavLink>
              </NavItem>
            ))}
          </div>
        </Nav>
      </nav>
    </div>
  );
};

export default Navigation;
