import { Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import LoginIcon from "@mui/icons-material/Login";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

const Header = (props) => {
  const router = useRouter();

  const handleLogout = async () => {
    const axiosInstance = axios.create({
      baseURL: `http://shikaku-app:3001/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    await axiosInstance
      .delete("auth/sign_out", {
        headers: {
          "access-token": Cookies.get("access-token"),
          client: Cookies.get("client"),
          uid: Cookies.get("uid"),
        },
      })
      .then((response) => {
        if (response.data.success) {
          Cookies.remove("uid");
          Cookies.remove("client");
          Cookies.remove("access-token");
          props.setLoginStatus(false);
          props.setCurrentUser({});
          router.push("/");
        } else if (!response.data.success) {
          console.log(response.data.errors);
        }
      })
      .catch((error) => {
        console.log("エラー", error);
      });
  };

  return (
    <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Typography
        component={Link}
        href="/"
        variant="h6"
        color="inherit"
        align="left"
        noWrap
        sx={{ flex: 1 }}
        style={{ textDecoration: "none" }}
      >
        {props.title}
      </Typography>
      <Typography
        component={Link}
        href="#"
        variant="h6"
        color="inherit"
        align="left"
        noWrap
        sx={{ flex: 1 }}
        style={{ textDecoration: "none" }}
      >
        {/* ログイン状態：{props.loginStatus} */}
      </Typography>
      {props.loginStatus ? (
        <>
          <Button
            variant="outlined"
            size="middle"
            component={Link}
            href="/posts/new"
          >
            <CreateIcon sx={{ mr: 1 }} />
            投稿する
          </Button>
          <Button
            variant="outlined"
            size="middle"
            sx={{ ml: 1 }}
            onClick={handleLogout}
          >
            ログアウト
            <LoginIcon sx={{ ml: 1 }} />
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            size="middle"
            component={Link}
            href="/login"
          >
            <LoginIcon sx={{ mr: 1 }} />
            ログイン
          </Button>
          <Button
            variant="outlined"
            size="middle"
            component={Link}
            sx={{ ml: 1 }}
            href="/signup"
          >
            <PersonIcon sx={{ mr: 1 }} />
            新規登録
          </Button>
        </>
      )}
    </Toolbar>
  );
};

export default Header;
