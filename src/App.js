import React, { useEffect, useRef } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import FeedPage from "./pages/feed";
import ExplorePage from "./pages/explore";
import ProfilePage from "./pages/profile";
import EditProfilePage from "./pages/edit-profile";
import PostPage from "./pages/post";
import LoginPage from "./pages/login";
import SignupPage from "./pages/signup";
import NotFoundPage from "./pages/not-found";
import PostModal from "./components/post/PostModal";

function App() {
  const history = useHistory();
  const modal = history.location.state?.modal;
  //Track previous location synchronously since useState is asyncronous
  const prevLocation = useRef(history.location);

  useEffect(() => {
    if (history.action === "PUSH" && !modal) {
      prevLocation.current = history.location;
    }
  }, [history.location, modal, history.action]);

  const isModalOpen = modal && prevLocation.current !== history.location;

  return (
    <>
      <Switch location={isModalOpen ? prevLocation.current : history.location}>
        <Route exact path="/" component={FeedPage} />
        <Route path="/explore" component={ExplorePage} />
        <Route exact path="/:username" component={ProfilePage} />
        <Route exact path="/p/:postId" component={PostPage} />
        <Route path="/accounts/edit" component={EditProfilePage} />
        <Route path="/accounts/login" component={LoginPage} />
        <Route path="/accounts/emailsignup" component={SignupPage} />
        <Route path="*" component={NotFoundPage} />
      </Switch>
      {isModalOpen && <Route exact path="/p/:postId" component={PostModal} />}
    </>
  );
}

export default App;
