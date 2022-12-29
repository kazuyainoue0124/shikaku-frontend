import { Button, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';

const Header = (props) => {
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
      <Button variant="outlined" size="middle" component={Link} href="/login">
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
    </Toolbar>
  );
};

export default Header;
