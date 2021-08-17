import Link from "next/link";

export default function Custom404() {
  return (
    <div className="error-page">
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
