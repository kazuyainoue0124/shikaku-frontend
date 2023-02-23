import {
  Alert,
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { useState } from "react";

const CreatePost = (props) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { currentUser } = props;
  const { certificates } = props.certificates;

  const [title, setTitle] = useState("");
  const [certificateId, setCertificateId] = useState("");
  const [studyPeriod, setStudyPeriod] = useState("");
  const [howToStudy, setHowToStudy] = useState("");
  const [valuableScore, setValuableScore] = useState("");
  const [whoIsRecommended, setWhoIsRecommended] = useState("");

  const studyPeriods = [];

  for (let i = 1; i <= 12; i++) {
    studyPeriods.push({
      value: i,
      label: `〜${i}ヶ月`
    });
  }
  studyPeriods.push({
    value: 13,
    label: "それ以上"
  });

  const valuableScores = [
    {
      value: 5,
      label: "すごく役に立った",
    },
    {
      value: 4,
      label: "どちらかというと役に立った",
    },
    {
      value: 3,
      label: "どちらとも言えない",
    },
    {
      value: 2,
      label: "どちらかというと役に立っていない",
    },
    {
      value: 1,
      label: "役に立っていない",
    },
  ]

  const handleSubmit = (event) => {
    event.preventDefault();
    const axiosInstance = axios.create({
      baseURL: `https://shikaku-app.net/api/v1/`,
      headers: {
        "content-type": "application/json",
        uid: Cookies.get("uid"),
        client: Cookies.get("client"),
        "access-token": Cookies.get("access-token"),
      },
    });
    (async () => {
      setIsError(false);
      setErrorMessage("");
      return await axiosInstance
        .post(
          "posts",
          {
            user_id: currentUser.id,
            title: title,
            certificate_id: certificateId,
            study_period: studyPeriod,
            how_to_study: howToStudy,
            valuable_score: valuableScore,
            who_is_recommended: whoIsRecommended,
          },
          { withCredentials: true }
        )
        .then(function (response) {
          if (response.data.status === "success") {
            router.push("/");
          } else {
            setIsError(true);
            setErrorMessage(rsponse.data.message);
          }
        })
        .catch(function (error) {
          console.log(error);
          setIsError(true);
          setErrorMessage("処理が失敗しました");
        });
    })();
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          新規投稿
        </Typography>
        <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="title"
                label="タイトル"
                name="post[title]"
                autoComplete="title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                id="certificate"
                label="資格"
                name="post[certificate]"
                autoComplete="certificate"
                value={certificateId}
                onChange={(event) => setCertificateId(event.target.value)}
              >
                {certificates.map((certificate) => (
                  <MenuItem key={certificate.id} value={certificate.id}>
                    {certificate.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                name="post[studyPeriod]"
                label="学習期間"
                id="studyPeriod"
                autoComplete="studyPeriod"
                value={studyPeriod}
                onChange={(event) => setStudyPeriod(event.target.value)}
              >
                {studyPeriods.map((studyPeriod) => (
                  <MenuItem key={studyPeriod.value} value={studyPeriod.value}>
                    {studyPeriod.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="post[howToStudy]"
                label="勉強方法"
                id="howToStudy"
                autoComplete="howToStudy"
                value={howToStudy}
                onChange={(event) => setHowToStudy(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                name="post[whoIsRecommended]"
                label="どんな人におすすめか？"
                id="whoIsRecommended"
                autoComplete="whoIsRecommended"
                value={whoIsRecommended}
                onChange={(event) => setWhoIsRecommended(event.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                name="post[valuableScore]"
                label="実務に役立ったか？"
                id="valuableScore"
                autoComplete="valuableScore"
                value={valuableScore}
                onChange={(event) => setValuableScore(event.target.value)}
              >
                {valuableScores.map((valuableScore) => (
                  <MenuItem
                    key={valuableScore.value}
                    value={valuableScore.value}
                  >
                    {valuableScore.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            投稿する
          </Button>
          {isError ? (
            <Alert
              onClose={() => {
                setIsError(false);
                setErrorMessage("");
              }}
              severity="error"
            >
              {errorMessage}
            </Alert>
          ) : null}
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePost;

export const getStaticProps = async () => {
  const res = await fetch("https://shikaku-app.net/api/v1/certificates");
  const certificates = await res.json();

  return {
    props: {
      certificates,
    },
  };
};
