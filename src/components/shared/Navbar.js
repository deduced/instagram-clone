import React, { useEffect, useState } from "react";
import { useNavbarStyles, WhiteTooltip, RedTooltip } from "../../styles";
import {
  AppBar,
  Avatar,
  Fade,
  Grid,
  Hidden,
  InputBase,
  Typography,
  Zoom,
} from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";
import logo from "../../images/logo.png";
import {
  AddIcon,
  ExploreActiveIcon,
  ExploreIcon,
  HomeActiveIcon,
  HomeIcon,
  LikeActiveIcon,
  LikeIcon,
  LoadingIcon,
} from "../../icons";
import NotificationTooltip from "../notification/NotificationTooltip";
import { defaultCurrentUser, getDefaultUser } from "../../data";
import NotificationList from "../notification/NotificationList";
import { useNProgress } from "@tanem/react-nprogress";

function Navbar({ minimalNavbar }) {
  const classes = useNavbarStyles();
  const history = useHistory();
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const path = history.location.pathname;

  useEffect(() => {
    setIsLoadingPage(false);
  }, [path]);

  return (
    <>
      <Progress isAnimating={isLoadingPage} />
      <AppBar className={classes.appBar}>
        <section className={classes.section}>
          <Logo />
          {!minimalNavbar && (
            <>
              <Search history={history} />
              <Links path={path} />
            </>
          )}
        </section>
      </AppBar>
    </>
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

function Search({ history }) {
  const classes = useNavbarStyles();
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const hasResults = Boolean(query) && results.length > 0;

  useEffect(() => {
    if (!query.trim()) return;
    setResults(Array.from({ length: 5 }, () => getDefaultUser()));
  }, [query]);

  function handleClearInput() {
    setQuery("");
  }

  return (
    <Hidden only="xs">
      <WhiteTooltip
        arrow
        interactive
        open={hasResults}
        title={
          hasResults && (
            <Grid className={classes.resultsContainer} container>
              {results.map((result) => (
                <Grid
                  className={classes.resultLink}
                  item
                  key={result.id}
                  onClick={() => {
                    history.push(`/${result.username}`);
                    handleClearInput();
                  }}
                >
                  <div className={classes.resultWrapper}>
                    <div className={classes.avatarWrapper}>
                      <Avatar src={result.profile_image} alt="User avatar" />
                    </div>
                    <div className={classes.nameWrapper}>
                      <Typography variant="body2" color="textSecondary">
                        {result.username}
                      </Typography>
                      <Typography variant="body1">{result.name}</Typography>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )
        }
        TransitionComponent={Fade}
      >
        <InputBase
          className={classes.input}
          endAdornment={
            isLoading ? (
              <LoadingIcon />
            ) : (
              <span className={classes.clearIcon} onClick={handleClearInput} />
            )
          }
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search"
          startAdornment={<span className={classes.searchIcon} />}
          value={query}
        />
      </WhiteTooltip>
    </Hidden>
  );
}

function Links({ path }) {
  const classes = useNavbarStyles();
  const [isShowingList, setShowingList] = useState(false);
  const [isShowingTooltip, setShowingTooltip] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(handleHideTooltip, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function handleToggleList() {
    setShowingList((prev) => !prev);
  }

  function handleHideTooltip() {
    setShowingTooltip(false);
  }

  function handleHideList() {
    setShowingList(false);
  }

  return (
    <div className={classes.linksContainer}>
      {isShowingList && <NotificationList handleHideList={handleHideList} />}
      <div className={classes.linksWrapper}>
        <Hidden xsDown>
          <AddIcon />
        </Hidden>
        <Link to="/">{path === "/" ? <HomeActiveIcon /> : <HomeIcon />}</Link>
        <Link to="/explore">
          {path === "/explore" ? <ExploreActiveIcon /> : <ExploreIcon />}
        </Link>
        <RedTooltip
          arrow
          open={isShowingTooltip}
          onOpen={handleHideTooltip}
          TransitionComponent={Zoom}
          title={<NotificationTooltip />}
        >
          <div className={classes.notifications} onClick={handleToggleList}>
            {isShowingList ? <LikeActiveIcon /> : <LikeIcon />}
          </div>
        </RedTooltip>
        <Link to={`/${defaultCurrentUser.username}`}>
          <div
            className={
              path === `${defaultCurrentUser.username}`
                ? classes.profileActive
                : ""
            }
          >
            <Avatar
              src={defaultCurrentUser.profile_image}
              className={classes.profile_image}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

function Progress({ isAnimating }) {
  const classes = useNavbarStyles();
  const { animationDuration, isFinished, progress } = useNProgress({
    isAnimating,
  });

  return (
    <div
      className={classes.progressContainer}
      style={{
        opacity: isFinished ? 0 : 1,
        transition: `opacity ${animationDuration}ms linear`,
      }}
    >
      <div
        className={classes.progressBar}
        style={{
          marginLeft: `${(-1 + progress) * 100}%`,
          transition: `margin-left ${animationDuration}ms linear`,
        }}
      >
        <div className={classes.progressBackground} />
      </div>
    </div>
  );
}

export default Navbar;
