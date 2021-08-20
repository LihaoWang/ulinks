import React from "react";
import Link from "next/link";
import { auth } from "../lib/firebase";
function Success() {
  async function signOut(e) {
    e.preventDefault();
    await auth.signOut();
  }
  return (
    <div>
      <div className="success-page">
        <img className="success-img" src="login.svg" alt="success"></img>
        <h2 style={{ textAlign: "center" }}>
          You&apos;ve logged in successfully. Go to{" "}
          <Link href="/admin" passHref>
            dashboard
          </Link>
        </h2>
        <button
          style={{ alignSelf: "center", backgroundColor: "#de0000" }}
          className="submit-btn"
          onClick={signOut}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

export default Success;
