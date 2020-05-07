import React from "react";
import { useNavbarStyles } from "../../styles";
import { AppBar } from "@material-ui/core";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();

  return (
    <AppBar className={classes.appBar}>
      <section className={classes.section}>
        <Logo />
        {!minimalNavbar && (
          <>
            <Search />
            <Links />
          </>
        )}
      </section>
    </AppBar>
  );
}

function Logo() {
  const classes = useNavbarStyles();
  return (
    <div className={classes.logoContainer}>
      <Link to="/">
        <div className={classes.logoWrapper}>
          <img src={logo} alt="Instagram" className={classes.logo} />
        </div>
      </Link>
    </div>
  );
}

function Search() {
  return <span>Search</span>;
}

function Links() {
  return <span>Links</span>;
}

export default Navbar;
