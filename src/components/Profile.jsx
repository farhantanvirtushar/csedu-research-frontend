import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Button from "@material-ui/core/Button";

import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Post from "./Post";

import { updateUser, getUser } from "../User";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: 5,
    paddingBottom: 5,
  },
  details: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto",
  },
  coverPhoto: {
    height: 300,
  },

  profilePicture: {
    marginTop: 200,
    marginLeft: 20,
    width: 150,
    height: 150,
    borderStyle: "solid",
    borderColor: "white",
    position: "absolute",
  },
  profileInfo: {
    marginTop: 50,
    marginLeft: 10,
  },
  profileButtons: {
    alignSelf: "flex-end",
    margin: 10,
  },
}));

const getProfile = async (setProfile, id) => {
  const res = await axios.get("/api/users/" + id);

  setProfile(res.data);
};

const getPosts = async (setPosts, id) => {
  const res = await axios.get("/api/posts/people/" + id);

  setPosts(res.data);
};

export default function Profile() {
  const { id } = useParams();
  let user = getUser();

  const classes = useStyles();

  const [profile, setProfile] = useState(null);
  const [follow, setFollow] = useState(false);
  const [posts, setPosts] = useState([]);

  const handleFollow = async () => {
    if (follow) {
      setFollow(false);
      await axios.put("/api/users/" + id + "/unfollow", { userID: user._id });
      user.followings.pop(String(id));
    } else {
      setFollow(true);
      await axios.put("/api/users/" + id + "/follow", { userID: user._id });
      user.followings.push(String(id));
    }
    user = updateUser(user);
  };

  useEffect(() => {
    getProfile(setProfile, id);
    getPosts(setPosts, id);

    if (user.followings.find((item) => item == id)) {
      setFollow(true);
    }
  }, [id]);

  return (
    <div>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardMedia
            className={classes.coverPhoto}
            image="https://www.cse.du.ac.bd/wp-content/uploads/2015/05/6.jpg"
          >
            <Avatar
              alt="Remy Sharp"
              src="https://lumiere-a.akamaihd.net/v1/images/ef91b3eba7549321e53d2c6a18b752a9cf5d2637.jpeg?"
              className={classes.profilePicture}
            />
          </CardMedia>

          <div className={classes.profileButtons}>
            {user._id == id ? (
              <Button variant="contained" color="primary">
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleFollow}
              >
                {follow ? "Unfollow" : "Follow"}
              </Button>
            )}
          </div>

          <div className={classes.profileInfo}>
            <Typography variant="body2" color="textSecondary" component="p">
              <div style={{ color: "black", fontWeight: "bold", fontSize: 20 }}>
                {profile == null
                  ? ""
                  : profile.firstname + " " + profile.lastname}
              </div>
              {profile == null ? "" : "@" + profile.username}
            </Typography>
          </div>
        </div>
      </Card>
      <div>
        {posts.map((item) => (
          <Post key={item._id} post={item} />
        ))}
      </div>
    </div>
  );
}
