import { fromPairs } from "lodash";
import Head from "next/head";
import Image from "next/image";

import toast from "react-hot-toast";
import Link from "next/link";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <div className="page-wrapper">
      <div className="hero">
        <div>
          <img src="mock.png"></img>
        </div>
        <div className="hero-content">
          <p className="hero-title">One link for everything</p>
          <p className="hero-subtitle">
            Share your links, products, videos, and more on one page
          </p>
          <div className="address-bar">
            <p>
              https://ulinks.app/<b style={{ color: "#987cff" }}>yourname</b>
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
