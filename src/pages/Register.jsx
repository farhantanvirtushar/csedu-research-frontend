import React from "react";
import { useContext, useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

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
    marginTop: theme.spacing(2),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [userCreated, setUserCreated] = useState(false);

  const rePasswordRef = useRef();

  if (userCreated) {
    return <Redirect to="/" />;
  }

  let remembered = localStorage.getItem("rememberMe") === "true";
  if (remembered) {
    return <Redirect to="/" />;
  } else {
    remembered = sessionStorage.getItem("rememberMe") === "true";
    if (remembered) {
      return <Redirect to="/" />;
    }
  }

  const registerHandler = async (event) => {
    event.preventDefault();

    var csrftoken = Cookies.get("csrftoken");
    let config = {
      headers: {
        "X-CSRFToken": csrftoken,
      },
    };

    if (password != rePassword) {
      setPasswordsMatch(false);
    } else {
      const userData = {
        username: username,
        password1: password,
        password2: rePassword,
      };

      try {
        const res = await axios.post(
          "/api/v1/auth/registration/",
          userData,
          config
        );
        if (res) {
          let data = {
            username: username,
            key: res.data.key,
          };
          localStorage.setItem("rememberMe", "true");
          localStorage.setItem("user", JSON.stringify(data));
        }
      } catch (error) {}

      setUserCreated(true);
    }
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
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(event) => setFirstname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(event) => setLastname(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                onChange={(event) => setUsername(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="repassword"
                label="Re Enter Password"
                type="password"
                id="repassword"
                ref={rePasswordRef}
                onChange={(event) => setRePassword(event.target.value)}
              />
            </Grid>
          </Grid>
          <Alert
            variant="filled"
            severity="error"
            style={{
              margin: 3,
              visibility: passwordsMatch ? "hidden" : "visible",
            }}
          >
            Passwords doesn't match
          </Alert>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={registerHandler}
          >
            Sign Up
          </Button>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
