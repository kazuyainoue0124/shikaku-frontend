import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

const Sidebar = (props) => {
  const { currentUser } = props;
  return (
    <Grid item xs={12} md={4}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex", mt: 4 }}>
          <CardContent sx={{ flex: 3 }}>
            <Typography component="h2" variant="h5">
              {currentUser.user_name}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              こんにちは！SE歴3年の山田太郎です！
            </Typography>
          </CardContent>
        </Card>
      </CardActionArea>
    </Grid>
  );
};

export default Sidebar;
