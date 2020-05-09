import React from "react";
import Modal from "react-modal";
import { usePostModalStyles } from "../../styles";
import { useHistory, useParams } from "react-router-dom";
import { CloseIcon } from "../../icons";
import Post from "./Post";

function PostModal() {
  const classes = usePostModalStyles();
  const history = useHistory();
  const { postId } = useParams();

  return (
    <>
      <Modal
        ariaHideApp={false}
        isOpen
        overlayClassName={classes.overlay}
        onRequestClose={() => history.goBack()}
        style={{
          content: {
            alignItems: "center",
            bottom: "auto",
            display: "flex",
            left: "50%",
            margin: 0,
            maxWidth: 935,
            overflow: "none",
            padding: 0,
            right: "auto",
            top: "50%",
            transform: "translate(-50%, -50%)",
            WebkitOverflowScrolling: "touch",
            width: "100%",
          },
        }}
      >
        <Post id={postId} />
      </Modal>
      <div onClick={() => history.goBack()} className={classes.close}>
        <CloseIcon />
      </div>
    </>
  );
}

export default PostModal;
