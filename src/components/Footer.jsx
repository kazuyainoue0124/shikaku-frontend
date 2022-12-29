import { Box, Container, Typography } from "@mui/material";
import Link from "next/link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Footer = (props) => {
  return (
    <Box component="footer" sx={{ bgcolor: "background.paper", py: 3, mt: 4, borderTop: 1, borderColor: "divider" }}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {props.title}
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          {props.description}
        </Typography>
      </Container>
      <Copyright />
    </Box>
  );
}

export default Footer;