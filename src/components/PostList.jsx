import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Link from "next/link";

const PostList = (props) => {
  const { posts } = props;

  const handleToDate = (data) => {
    const date = new Date(data);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    };
    return new Intl.DateTimeFormat("ja-JP", options).format(date);
  };

  return (
    <Grid item xs={12} md={8}>
      {posts.posts.map((post) => (
        <div key={post.id}>
          <CardActionArea
            component={Link}
            href={`posts/${post.id}`}
          >
            <Card sx={{ display: "flex", mt: 4 }}>
              <CardContent sx={{ flex: 3 }}>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {handleToDate(post.updated_at)}
                </Typography>
                <Typography variant="subtitle1">
                  by {post.user.user_name}
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </div>
      ))}
    </Grid>
  );
};

export default PostList;
