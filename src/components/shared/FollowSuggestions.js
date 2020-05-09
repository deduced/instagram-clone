import React from "react";
import { useFollowSuggestionsStyles } from "../../styles";
import { Typography, Avatar } from "@material-ui/core";
import { LoadingLargeIcon } from "../../icons";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FollowButton from "../shared/FollowButton";
import { getDefaultUser } from "../../data";

function FollowSuggestions({ hideHeader = false }) {
  const classes = useFollowSuggestionsStyles();

  let loading = false;

  return (
    <div className={classes.container}>
      {!hideHeader && (
        <Typography
          className={classes.typography}
          color="textSecondary"
          variant="subtitle2"
        >
          Suggestions For You
        </Typography>
      )}
      {loading ? (
        <LoadingLargeIcon />
      ) : (
        <Slider
          arrows
          className={classes.slide}
          dots={false}
          easing="ease-in-out"
          infinite
          slidesToScroll={3}
          speed={1000}
          swipeToSlide
          touchThreshold={1000}
          variableWidth
        >
          {Array.from({ length: 10 }, () => getDefaultUser()).map((user) => (
            <FollowSuggestionsItem key={user.id} user={user} />
          ))}
        </Slider>
      )}
    </div>
  );
}

function FollowSuggestionsItem({ user }) {
  const classes = useFollowSuggestionsStyles();
  const { profile_image, username, name } = user;

  return (
    <div>
      <div className={classes.card}>
        <Link to={`/${username}`}>
          <Avatar
            alt={`${username}'s profile`}
            classes={{
              root: classes.avatar,
              img: classes.avatarImg,
            }}
            src={profile_image}
          />
        </Link>
        <Link to={`/${username}`}>
          <Typography
            align="center"
            className={classes.text}
            variant="subtitle2"
          >
            {username}
          </Typography>
          <Typography
            align="center"
            className={classes.text}
            color="textSecondary"
            variant="body2"
          >
            {name}
          </Typography>
        </Link>
        <FollowButton side={false} />
      </div>
    </div>
  );
}

export default FollowSuggestions;
