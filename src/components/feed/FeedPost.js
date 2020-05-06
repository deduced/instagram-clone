import React, { useState } from "react";
import { useFeedPostStyles } from "../../styles";
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
import HTMLEllipsis from "react-lines-ellipsis/lib/html";

function FeedPost({ post }) {
  const classes = useFeedPostStyles();
  const [isShowingCaption, setIsShowingCaption] = useState(false);
  const { caption, comments, id, likes, media, user } = post;

  return (
    <>
      <article className={classes.article}>
        <div className={classes.postHeader}>
          <UserCard user={user} />
          <MoreIcon className={classes.moreIcon} />
        </div>
        <div>
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
          <Typography className={classes.like} variant="subtitle2">
            <span>{likes === 1 ? `1 like` : `${likes} likes`}</span>
          </Typography>
          <div
            className={isShowingCaption ? classes.expanded : classes.collapsed}
          >
            <Link to={`/${user.username}`}>
              <Typography
                variant="subtitle2"
                component="span"
                className={classes.username}
              >
                {user.username}
              </Typography>
            </Link>
            {isShowingCaption ? (
              <Typography
                variant="body2"
                component="span"
                dangerouslySetInnerHTML={{ __html: caption }}
              />
            ) : (
              <div className={classes.captionWrapper}>
                <HTMLEllipsis
                  unsafeHTML={caption}
                  className={classes.caption}
                  maxLine="0"
                  ellipsis="..."
                  basedOn="letters"
                />
                <Button
                  className={classes.moreButton}
                  onClick={() => setIsShowingCaption(true)}
                >
                  more
                </Button>
              </div>
            )}
          </div>
          <Link to={`/p/${id}`}>
            <Typography
              className={classes.commentsLink}
              variant="body2"
              component="div"
            >
              View all {comments.length} comments
            </Typography>
          </Link>
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
          {/* TODO: REMOVE HARD CODED COMMENT DATE */}
          <Typography color="textSecondary" className={classes.datePosted}>
            5 DAYS AGO
          </Typography>
        </div>
        <Hidden xsDown>
          <Divider />
          <Comment />
        </Hidden>
      </article>
    </>
  );
}

function LikeButton() {
  const classes = useFeedPostStyles();
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
  const classes = useFeedPostStyles();
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
  const classes = useFeedPostStyles();
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

export default FeedPost;
