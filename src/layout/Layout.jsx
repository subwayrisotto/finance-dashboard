import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBarComponent/NavBarComponent";

function Layout() {
  return (
    <div className="app">
      <NavBar />
      <main style={mainStyles}>
        <Outlet />
      </main>
    </div>
  );
}

const mainStyles = {
  maxWidth: "1280px",
  width: "100%",
  margin: "0 auto",
};

export default Layout;
