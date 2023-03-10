import {
  Card,
  CardContent,
  Divider,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React from "react";

// post:getStaticPropsから取得したデータ
const Post = (props) => {
  const { post } = props.post;

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
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12} md={8}>
        <Card sx={{ display: "flex", mt: 4 }}>
          <CardContent sx={{ flex: 3 }}>
            <Typography component="h2" variant="h6">
              {post.title}
            </Typography>
            <Typography gutterBottom={true}>
              {handleToDate(post.updated_at)} by {post.user.user_name}
            </Typography>
            <Typography variant="subtitle1">資格</Typography>
            <Divider />
            <Typography paragraph={true}>{post.certificate.name}</Typography>
            <Typography variant="subtitle1">学習期間</Typography>
            <Divider />
            <Typography paragraph={true}>〜{post.study_period}ヶ月</Typography>
            <Typography variant="subtitle1">勉強方法</Typography>
            <Divider />
            <Typography paragraph={true}>{post.how_to_study}</Typography>
            <Typography variant="subtitle1">どんな人におすすめか？</Typography>
            <Divider />
            <Typography paragraph={true}>{post.who_is_recommended}</Typography>
            <Typography variant="subtitle1">実務に役立ったか？</Typography>
            <Divider />
            <Rating name="read-only" value={post.valuable_score} readOnly />
          </CardContent>
        </Card>
        <Link href="/">戻る</Link>
      </Grid>
    </Grid>
  );
};

Post.displayName = "Post";

export default Post;

export const getServerSideProps = async (context) => {
  const id = context.query.postId;
  const res = await fetch(`https://shikaku-app.net/api/v1/posts/${id}`);
  const post = await res.json();

  // ページコンポーネントにpropsとして渡す
  return {
    props: {
      post,
    },
  };
};
