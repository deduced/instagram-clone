import React from "react";
import FollowSuggestions from "../shared/FollowSuggestions";
import { useExploreSuggestionsStyles } from "../../styles";
import { Hidden, Typography } from "@material-ui/core";

function ExploreSuggestions() {
  const classes = useExploreSuggestionsStyles();

  return (
    <Hidden xsDown>
      <div className={classes.container}>
        <Typography
          className={classes.typography}
          color="textSecondary"
          component="h2"
          variant="subtitle"
        >
          Discover People
        </Typography>
        <FollowSuggestions hideHeader />
      </div>
    </Hidden>
  );
}

export default ExploreSuggestions;
