import {
  Grid,
} from "@mui/material";
import PostList from "src/components/PostList";
import Sidebar from "src/components/Sidebar";

export default function Home(props) {
  const { currentUser, posts } = props;

  return (
    <Grid container spacing={3}>
      <PostList posts={posts} />
      <Sidebar currentUser={currentUser} />
    </Grid>
  );
}

export const getStaticProps = async () => {
  const res = await fetch("https://shikaku-app.net/api/v1/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
};