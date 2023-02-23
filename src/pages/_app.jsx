import Header from "src/components/Header";
import Footer from "src/components/Footer";
import "src/styles/globals.css";
import {
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import jaJP from "@mui/material/locale";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";

const theme = createTheme({}, jaJP);

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [loginStatus, setLoginStatus] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const checkLoginStatus = useCallback(async () => {
    if (
      !Cookies.get("access-token") ||
      !Cookies.get("client") ||
      !Cookies.get("uid")
    ) {
      setLoginStatus(false);
      setCurrentUser({});
      return;
    }
    const axiosInstance = axios.create({
      baseURL: `https://shikaku-app.net/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    return await axiosInstance
      .get(
        "auth/sessions",
        {
          headers: {
            "access-token": Cookies.get("access-token"),
            client: Cookies.get("client"),
            uid: Cookies.get("uid"),
          },
        },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.data.loginStatus && !loginStatus) {
          setLoginStatus(true);
          setCurrentUser(response.data.user);
        } else if (!response.data.loginStatus && loginStatus) {
          setLoginStatus(false);
          setCurrentUser({});
        }
      })
      .catch((error) => {
        console.log("エラー", error);
      });
  }, [loginStatus]);

  useEffect(() => {
    checkLoginStatus();
  }, [checkLoginStatus]);

  const handleSuccessfulAuthentication = (data) => {
    handleLogin(data);
    router.push("/");
  };

  const handleLogin = (data) => {
    setLoginStatus(true);
    setCurrentUser(data.data);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header
            title="シカクチコミ - IT資格の口コミアプリ -"
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
            setCurrentUser={setCurrentUser}
          />
          <Component
            {...pageProps}
            handleSuccessfulAuthentication={handleSuccessfulAuthentication}
            currentUser={currentUser}
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
