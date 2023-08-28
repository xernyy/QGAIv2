import Head from "next/head";
import Hero from "./hero";
import Navbar from "./navbar";
import Footer from "./footer";
import PopupWidget from "./popupWidget";

const HomePageComponent = () => {
  return (
    <>
      <Head>
        <title>Sage AI- Acquisition, Understanding, Application, Adaptation</title>
        <meta
          name="description"
          content="Sage Ai: Guiding Your Journey from Knowledge to Mastery"
        />
        <link rel="icon" href="/img/logo.png" />
      </Head>

      <Navbar />
      <Hero />

      <Footer />
      <PopupWidget />
    </>
  );
}

export default HomePageComponent;