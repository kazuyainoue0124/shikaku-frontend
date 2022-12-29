import { Card, CardActionArea, CardContent, Typography } from "@mui/material";

const PostSummary = () => {
  return (
    <CardActionArea component="a" href="#">
      <Card sx={{ display: "flex", mt: 4 }}>
        <CardContent sx={{ flex: 3 }}>
          <Typography component="h2" variant="h5">
            記事のタイトルが入ります。
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            2022年12月15日
          </Typography>
          <Typography variant="subtitle1">by 山田太郎</Typography>
        </CardContent>
      </Card>
    </CardActionArea>
  );
};

export default PostSummary;
