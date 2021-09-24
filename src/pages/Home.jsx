import React from "react";

import Leftbar from "../components/Leftbar";
import Rightbar from "../components/Rightbar";
import Feed from "../components/Feed";
import { Box, Grid } from "@material-ui/core";

import { Redirect } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Profile from "../components/Profile";

export default function Home() {
  let user = null;
  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      user = JSON.parse(sessionStorage.getItem("user"));
    } else {
      return <Redirect to="/login" />;
    }
  }

  return (
    <Router>
      <Switch>
        <Grid container>
          <Grid item xs={0} md={2}>
            <Box display={{ xs: "none", md: "block" }}>
              <Leftbar />
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Box>
              <Route exact path="/">
                <Feed />
              </Route>
              <Route path="/profile/:id">
                <Profile />
              </Route>
            </Box>
          </Grid>
          <Grid item xs={0} md={3}>
            <Box display={{ xs: "none", md: "block" }}>
              <Rightbar />
            </Box>
          </Grid>
        </Grid>
      </Switch>
    </Router>
  );
}
