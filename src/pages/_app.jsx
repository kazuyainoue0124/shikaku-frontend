import Header from "src/components/Header";
import Footer from "src/components/Footer";
import "src/styles/globals.css";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  jaJP,
} from "@mui/material";
import { useEffect, useState } from "react";
import Router from "next/router";
import axios from "axios";

const theme = createTheme({}, jaJP);

export default function App({ Component, pageProps }) {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
  const [user, setUser] = useState({});

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data);
    Router.push("/");
  };

  const handleLogin = (data) => {
    setLoggedInStatus("ログインなう");
    setUser(data.user);
  };

  useEffect(() => {
    checkLoginStatus();
  });

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setUser({});
  };

  const checkLoginStatus = () => {
    axios
      .get("http://localhost:3001/logged_in", { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in && loggedInStatus === "未ログイン") {
          setLoggedInStatus("ログインなう");
          setUser(response.data.user);
        } else if (
          !response.data.logged_in &&
          loggedInStatus === "ログインなう"
        ) {
          setLoggedInStatus("未ログイン");
          setUser({});
        }
      })
      .catch((error) => {
        console.log("ログインエラー", error);
      });
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            title="シカクチコミ - IT資格の口コミアプリ -"
            loggedInStatus={loggedInStatus}
            handleLogout={handleLogout}
          />
          <Component
            {...pageProps}
            loggedInStatus={loggedInStatus}
            handleSuccessfulAuthentication={handleSuccessfulAuthentication}
            handleLogout={handleLogout}
          />
          <Footer
            title="シカクチコミ! - IT資格の口コミアプリ -"
            description="Something here to give the footer a purpose!"
          />
        </Container>
      </ThemeProvider>
    </>
  );
}
