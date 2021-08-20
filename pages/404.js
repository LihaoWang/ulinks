import Link from "next/link";
import Head from "next/head";
export default function Custom404() {
  return (
    <div className="error-page">
      <Head>
        <title>Error</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <img src="404.svg" className="error-img" alt="404"></img>
      <h2 style={{ textAlign: "center" }}>
        404 - That page does not seem to exist...
      </h2>
      <Link href="/" passHref>
        <button className="submit-btn">Go home</button>
      </Link>
    </div>
  );
}
