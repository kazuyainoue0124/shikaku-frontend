import { Grid } from "@mui/material";
import PostList from "src/components/PostList";
import Sidebar from "src/components/Sidebar";

export default function Home(props) {
  return (
    <>
      <h2>ログイン状態：{props.loggedInStatus}</h2>
      <Grid container spacing={3}>
        <PostList />
        <Sidebar />
      </Grid>
    </>
  );
}
