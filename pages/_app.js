import "../styles/globals.css";

import Navbar from "../components/Navbar";
import { Toaster } from "react-hot-toast";
import { UserContext } from "../lib/context";
import { useEffect, useState } from "react";

import { useUserData } from "../lib/hooks";
import Loader from "../components/Loader";
import Router from "next/router";
function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  const userData = useUserData();
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <UserContext.Provider value={userData}>
          <Navbar />

          <Component {...pageProps} />
          <Toaster />
        </UserContext.Provider>
      )}
    </>
  );
}

export default MyApp;
