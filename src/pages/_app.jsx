import Header from "src/components/Header";
import Footer from "src/components/Footer";
import "src/styles/globals.css";
import { Container, createTheme, CssBaseline, ThemeProvider, jaJP } from "@mui/material";

const theme = createTheme({}, jaJP);

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="シカクチコミ - IT資格の口コミアプリ -" />
          <Component {...pageProps} />
          <Footer
            title="シカクチコミ! - IT資格の口コミアプリ -"
            description="Something here to give the footer a purpose!"
          />
        </Container>
      </ThemeProvider>
    </>
  );
}
