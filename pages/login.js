// import { Button, Card, Form } from 'semantic-ui-react';
import React, { useState, useEffect } from "react";

import firebase from "../components/firebase/firebase";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../components/firebase/firebase";
// import { Redirect } from "react-router-dom";

// import { deleteUser, setCurrentUser } from './../store/actions/authActions';
// import { connect } from 'react-redux';
// import 'semantic-ui-css/semantic.min.css';
// import Spinner from 'react-bootstrap/Spinner';
// import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { Wrapper, Title, WrapForm, Button } from "../components/style";

const Login = (props) => {
  const router = useRouter();
  const [logedIn, setlogedIn] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, sethasAccount] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setlogedIn(true);
        setEmailError("");
        router.push("/mapa2");
        console.log("OnAuthStateChanged: Logged in");
      } else {
        setlogedIn(false);
        console.log("OnAuthStateChanged: Logged out");
      }
    });
  }, []);

  useEffect(() => {
    logedIn && router.push("/mapa2");
  }, [logedIn]);
  //----------------------------------------------------
  const handleLogIn = (e) => {
    const auth = getAuth();

    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      // Handle Errors here.
      if (error) {
        setEmailError(error.code);
        setTimeout(() => {
          setEmailError("");
        }, 3000);
      }
      // setProcess(true);
      // setlogedIn(true);
    });
    setlogedIn(true);
    setFetching(true);
    setEmail("");
    setPassword("");

    // if (logedIn === false) {
    // 	return <Redirect to='/' />;
    // }
  };

  console.log("Error:", emailError);
  const handleLogOut = (e) => {
    e.preventDefault();

    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("odlogiralo");
      })
      .catch((error) => {
        // An error happened.
      });
    setEmail("");
    setPassword("");

    // if (logedIn === false) {
    // 	return <Redirect to='/' />;
    // }
  };

  // if (logedIn === true) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="formWrappFlex">
      {/* {!fetching && (
				<Spinner className='spinner' animation='border' role='status'>
					<span className='sr-only'>Loading...</span>
				</Spinner>
			)} */}
      <div className="formCenter">
        <Wrapper>
          <Title>Retro Zadar</Title>
          <form>
            <WrapForm>
              <input
                value={email}
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                value={password}
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </WrapForm>
            <Button type="submit" onClick={handleLogIn}>
              Log in
            </Button>
            {/* <Button
              className={classes.button}
              variant="contained"
              color="primary"
              type="submit"
              onClick={handleLogOut}
            >
              Log out
            </Button> */}
          </form>
          <div style={{ color: "red", position: "absolute", bottom: "50px" }}>
            {emailError}
          </div>
        </Wrapper>
      </div>
    </div>
  );
};

export default Login;
