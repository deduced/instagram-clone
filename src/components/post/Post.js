import React, { useState } from "react";
import { usePostStyles } from "../../styles";
import UserCard from "../shared/UserCard";
import { Link } from "react-router-dom";
import {
  MoreIcon,
  CommentIcon,
  ShareIcon,
  LikeIcon,
  UnlikeIcon,
  RemoveIcon,
  SaveIcon,
} from "../../icons";
import {
  Typography,
  Button,
  Hidden,
  Divider,
  TextField,
} from "@material-ui/core";
import FollowSuggestions from "../shared/FollowSuggestions";
import OptionsDialog from "../shared/OptionsDialog";
import { defaultPost } from "../../data";

function Post() {
  const classes = usePostStyles();
  const [isShowingOptionsDialog, setIsShowingOptionsDialog] = useState(false);
  const { caption, comments, id, likes, media, user } = defaultPost;

  return (
    <div className={classes.postContainer}>
      <article className={classes.article}>
        <div className={classes.postHeader}>
          <UserCard avatarSize={32} user={user} />
          <MoreIcon
            className={classes.moreIcon}
            onClick={() => setIsShowingOptionsDialog(true)}
          />
        </div>
        {/* Post Image */}
        <div className={classes.postImage}>
          <img src={media} alt="post media" className={classes.image} />
        </div>
        <div className={classes.postButtonsWrapper}>
          <div className={classes.postButtons}>
            <LikeButton />
            <Link to={`/p/${id}`}>
              <CommentIcon />
            </Link>
            <ShareIcon />
            <SaveButton />
          </div>
          <Typography className={classes.likes} variant="subtitle2">
            <span>{likes === 1 ? `1 like` : `${likes} likes`}</span>
          </Typography>
          <div className={classes.postCaptionContainer}>
            <Typography
              variant="body2"
              className={classes.postCaption}
              component="span"
              dangerouslySetInnerHTML={{
                __html: caption,
              }}
            />
            {comments.map((comment) => (
              <div key={comment.id}>
                <Link to={`/${comment.user.username}`}>
                  <Typography
                    variant="subtitle2"
                    component="span"
                    className={classes.commentUsername}
                  >
                    {comment.user.username}
                  </Typography>{" "}
                  <Typography variant="body2" component="span">
                    {comment.content}
                  </Typography>
                </Link>
              </div>
            ))}
          </div>

          {/* TODO: REMOVE HARD CODED COMMENT DATE */}
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
          <Hidden xsDown>
            <div className={classes.comment}>
              <Divider />
              <Comment />
            </div>
          </Hidden>
        </div>
      </article>
      {isShowingOptionsDialog && (
        <OptionsDialog onClose={() => setIsShowingOptionsDialog(false)} />
      )}
    </div>
  );
}

function LikeButton() {
  const classes = usePostStyles();
  const [isLiked, setIsLiked] = useState(false);
  const Icon = isLiked ? UnlikeIcon : LikeIcon;
  const className = isLiked ? classes.liked : classes.like;
  const onClick = isLiked ? handleUnlike : handleLike;

  function handleLike() {
    setIsLiked(true);
  }

  function handleUnlike() {
    setIsLiked(false);
  }

  return <Icon className={className} onClick={onClick} />;
}

function SaveButton() {
  const classes = usePostStyles();
  const [isSaved, setIsSaved] = useState(false);
  const Icon = isSaved ? RemoveIcon : SaveIcon;
  const onClick = isSaved ? handleRemove : handleSave;

  function handleSave() {
    setIsSaved(true);
  }

  function handleRemove() {
    setIsSaved(false);
  }

  return <Icon className={classes.saveIcon} onClick={onClick} />;
}

function Comment() {
  const classes = usePostStyles();
  const [content, setContent] = useState("");
  return (
    <div className={classes.commentContainer}>
      <TextField
        className={classes.textField}
        fullWidth
        InputProps={{
          classes: {
            root: classes.root,
            underline: classes.underline,
          },
        }}
        multiline
        onChange={(event) => setContent(event.target.value)}
        placeholder="Add a comment..."
        rows={1}
        rowsMax={2}
        value={content}
      />
      <Button
        className={classes.commentButton}
        color="primary"
        disabled={!content.trim()}
      >
        Post
      </Button>
    </div>
  );
}

export default Post;
