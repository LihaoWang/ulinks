import { fromPairs } from "lodash";
import Head from "next/head";
import Link from "next/link";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="page-wrapper">
      <Head>
        <title>Ulinks</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="hero">
        <div>
          <img className="hero-img" src="mockup.png" alt="mockup"></img>
        </div>
        <div className="hero-content">
          <p className="hero-title">One link for everything</p>
          <p className="hero-subtitle">
            Share your links, products, videos, and more on one page
          </p>
          <div className="address-bar">
            <p>
              https://ulinks.cool/<b style={{ color: "#987cff" }}>name</b>
            </p>
          </div>
          <Link href="/enter" passHref>
            <button className="submit-btn">Get started</button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
