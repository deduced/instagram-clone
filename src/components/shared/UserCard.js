import React from "react";
import { useUserCardStyles } from "../../styles";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import { defaultUser } from "../../data";

function UserCard({ avatarSize = 44, user = defaultUser }) {
  const classes = useUserCardStyles({ avatarSize });
  const { profile_image, name, username } = user;

  return (
    <div className={classes.wrapper}>
      <Link to={`/${username}`}>
        <Avatar
          alt="user avatar"
          className={classes.avatar}
          src={profile_image}
        />
      </Link>
      <div className={classes.nameWrapper}>
        <Link to={`/${username}`}>
          <Typography variant="subtitle2" className={classes.typography}>
            {username}
          </Typography>
        </Link>
        <Typography
          className={classes.typography}
          color="textSecondary"
          variant="body2"
        >
          {name}
        </Typography>
      </div>
    </div>
  );
}

export default UserCard;
