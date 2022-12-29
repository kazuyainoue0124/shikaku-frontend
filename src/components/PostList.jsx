import { Grid } from "@mui/material";
import PostSummary from "./PostSummary";

const PostList = () => {
  return (
    <Grid item xs={12} md={8}>
      <PostSummary />
      <PostSummary />
      <PostSummary />
      <PostSummary />
      <PostSummary />
    </Grid>
  );
}

export default PostList;