import React, { useState } from "react";
import { useFollowButtonStyles } from "../../styles";
import { Button } from "@material-ui/core";

function FollowButton({ side }) {
  const classes = useFollowButtonStyles({ side });
  const [isFollowing, setFollowing] = useState(false);

  const FollowBtn = (
    <Button
      variant={side ? "text" : "contained"}
      color="primary"
      className={classes.button}
      onClick={() => setFollowing(true)}
      fullWidth
    >
      Follow
    </Button>
  );

  const FollowingBtn = (
    <Button
      variant={side ? "text" : "outlined"}
      className={classes.button}
      onClick={() => setFollowing(false)}
      fullWidth
    >
      Following
    </Button>
  );

  return isFollowing ? FollowingBtn : FollowBtn;
}

export default FollowButton;
