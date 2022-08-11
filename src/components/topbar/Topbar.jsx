import React from "react";
import "./topbar.css";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Settings } from "@material-ui/icons";
import { useState, useEffect } from "react";

export default function Topbar() {
  const [allData, setCategory] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const data = await fetch(
      "https://websitebuild.herokuapp.com/api/auth-shop-owner/profile",
      {
        headers: {
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json",
          "auth-token": localStorage.getItem("user-info"),
        },
      }
    );
    const result = await data.json();
    setCategory(result.data);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  if (
    window.location.pathname === "/" ||
    window.location.pathname === "/homepage" ||
    window.location.pathname === "/price" ||
    window.location.pathname === "/dash" ||
    window.location.pathname === "/reg" ||
    window.location.pathname === "/tutorial" ||
    window.location.pathname === "/about" ||
    window.location.pathname === "/forgot"
  ) {
    return null;
  } else
    return (
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <img
              className="logo_topbar"
              src="asstes/logo.png"
              alt=""
              width="200"
              height="45"
            />
          </div>
          <div className="topRight">
            <div className="username">
              {allData?.first_name}_{allData?.second_name}
            </div>
            <div className="topbarIconContainer">
              <div>
                <button className="luck" onClick={handleClick}>
                  <Settings className="sidebarIcon" color="white" />
                </button>
                <Menu
                  className="nav-links"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <a href="/store" className="prof2">
                    <MenuItem>Store Detail</MenuItem>
                  </a>
                  <a href="/plan" className="prof2">
                    <MenuItem>Plan</MenuItem>
                  </a>
                  <a href="/profile" className="prof2">
                    <MenuItem className="prof">Profile</MenuItem>
                  </a>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
