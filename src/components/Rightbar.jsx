import React from "react";
import { useEffect, useState } from "react";
import { alpha, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import { Button, Grid } from "@material-ui/core";
import { Avatar, Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import axios from "axios";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },

  nested: {
    paddingLeft: theme.spacing(4),
  },
  search: {
    display: "flex",
    marginBottom: 3,
    padding: 3,
    borderRadius: 25,
    backgroundColor: "#EEEBF0",
    margin: theme.spacing(1, 3),
  },
  searchIcon: {
    paddingLeft: theme.spacing(2),
    margin: 3,
    height: "100%",
  },

  inputInput: {
    width: "100%",
  },
  discover: {
    margin: 6,
    padding: 6,
    borderRadius: 25,
    backgroundColor: "#EEEBF0",
  },
}));

const getPeople = async (setPeople) => {
  try {
    const res = await axios.get("/api/users/people/discover");

    setPeople(res.data);
  } catch (error) {
    console.log(error);
  }
};

export default function Rightbar() {
  const history = useHistory();
  const classes = useStyles();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    getPeople(setPeople);
  }, []);

  const handleClick = async () => {};
  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          placeholder="search people"
          classes={classes.inputInput}
          inputProps={{ "aria-label": "search" }}
        />
      </div>
      <div className={classes.discover}>
        <h5>People you may know</h5>

        {people.map((item) => (
          <List>
            <ListItem
              button
              onClick={async (event) => {
                history.push("/profile/" + item._id);
              }}
            >
              <Avatar
                aria-label="recipe"
                src="https://lumiere-a.akamaihd.net/v1/images/ef91b3eba7549321e53d2c6a18b752a9cf5d2637.jpeg?"
              ></Avatar>
              <Typography style={{ padding: 3 }}>
                {item.firstname + " " + item.lastname}
              </Typography>
            </ListItem>
          </List>
        ))}
      </div>
    </div>
  );
}
