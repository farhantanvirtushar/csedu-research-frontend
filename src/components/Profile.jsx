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
    marginBottom: 20,
    marginLeft: 10,
    fontWeight: "bold",
  },
}));

export default function Profile() {
  let user = getUser();

  const classes = useStyles();

  const [posts, setPosts] = useState([]);

  let config = {
    headers: {
      Authorization: "Token " + user.key,
    },
  };

  const getProfile = async () => {
    const res = await axios.get("/api/v1/profile/", config);

    setPosts(res.data);
  };
  useEffect(() => {
    getProfile();
  }, []);

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

          <Typography
            variant="h5"
            color="textPrimary"
            component="p"
            className={classes.profileInfo}
          >
            {user.username}
          </Typography>
        </div>
      </Card>
      <div>
        {posts.map((item) => (
          <Post key={item.id} post={item} />
        ))}
      </div>
    </div>
  );
}
