import React from "react";
import Link from "next/link";
function Success() {
  return (
    <div>
      <div className="success-page">
        <img className="success-img" src="login.svg"></img>
        <h2 style={{ textAlign: "center" }}>
          You've logged in successfully. Go to{" "}
          <Link href="/admin" passHref>
            dashboard
          </Link>
        </h2>
      </div>
    </div>
  );
}

export default Success;
