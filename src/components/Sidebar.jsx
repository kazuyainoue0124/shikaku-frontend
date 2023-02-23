import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import axios from "axios";
import Cookies from "js-cookie";

const Sidebar = (props) => {
  const { currentUser, loginStatus } = props;

  const handleLoginByGuestUser = async (event) => {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: `https://shikaku-app.net/api/v1/`,
      headers: {
        "content-type": "application/json",
      },
    });
    try {
      const response = await axiosInstance.post("auth/sign_in", {
        email: 'guest@example.com',
        password: 'password',
      });
      Cookies.set("uid", response.headers["uid"]);
      Cookies.set("client", response.headers["client"]);
      Cookies.set("access-token", response.headers["access-token"]);
      props.handleSuccessfulAuthentication(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Grid item xs={12} md={4}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex", mt: 4 }}>
          <CardContent sx={{ flex: 3 }}>
            {loginStatus ? (
              <>
                <Typography component="h2" variant="h5">
                  {currentUser.user_name}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {currentUser.profile}
                </Typography>
              </>
            ) : (
              <>
                <Typography variant="subtitle1" paragraph>
                  本サービスは現在開発中です。不具合・未実装が多数ありますがご了承ください。
                </Typography>
                <Button
                  variant="outlined"
                  size="middle"
                  sx={{ ml: 1 }}
                  onClick={handleLoginByGuestUser}
                >
                  <LoginIcon sx={{ mr: 1 }} />
                  ゲストユーザーでログイン
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Sidebar;
