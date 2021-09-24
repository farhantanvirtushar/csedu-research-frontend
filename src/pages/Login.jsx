import React from "react";
import { useContext, useState } from "react";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Cookies from "js-cookie";
import axios from "axios";

import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height: 100,
    width: 100,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LogIn() {
  let history = useHistory();
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  var csrftoken = Cookies.get("csrftoken");
  let config = {
    headers: {
      "X-CSRFToken": csrftoken,
    },
  };

  let remembered = localStorage.getItem("rememberMe") === "true";

  if (remembered) {
    // let data = JSON.parse(localStorage.getItem("user"));

    history.push("/");
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      history.push("/");
    }
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      let userData = {
        username: username,
        password: password,
      };
      console.log(userData);
      const res = await axios.post("/api/v1/auth/login/", userData, config);

      let data = {
        username: username,
        key: res.data.key,
      };
      localStorage.setItem("rememberMe", rememberMe ? "true" : "false");
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        sessionStorage.setItem("rememberMe", "true");
        sessionStorage.setItem("user", JSON.stringify(data));
      }
      history.push("/");
    } catch (error) {}
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRemember = (event) => {
    setRememberMe(event.target.value);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar
          className={classes.avatar}
          src="https://scontent.fdac22-1.fna.fbcdn.net/v/t31.18172-8/11115585_516046568560708_1145741775936519569_o.png?_nc_cat=103&ccb=1-5&_nc_sid=09cbfe&_nc_eui2=AeEvpFm895WJ_DOZr89zfwMbMHfZQZlEXagwd9lBmURdqFtURkXz0D04OrbWiq9l4aTEPbQPpBTIzhvrcekfRFKC&_nc_ohc=xksH-qlmqKAAX9mKRrN&_nc_ht=scontent.fdac22-1.fna&oh=1ebc19e8ab49820c1c4b2b2b8dcaf012&oe=6173CE06"
        ></Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form method="post" className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="email"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={handleRemember}
                color="primary"
              />
            }
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={submitHandler}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
