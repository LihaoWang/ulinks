import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import Image from "next/image";
export default function NavBar({}) {
  const { user, username } = useContext(UserContext);
  return (
    <nav className="bg-blue-200 h-auto px-5">
      <div className="navbar">
        <Link href="/" passHref>
          <div className="nav-logo">ulinks</div>
        </Link>

        {username && (
          <div className="nav-buttons">
            {/* <div className="nav-button">Sign Out</div> */}
            <Link href="/admin" passHref>
              <div className="nav-button">Dashboard</div>
            </Link>
            <div className="nav-pic">
              <Link href={`/${username}`} passHref>
                <img
                  className="profile-pic"
                  width="60px"
                  src={user?.photoURL}
                  alt="avatar"
                />
              </Link>
            </div>
          </div>
        )}

        {!username && (
          <div className="nav-buttons">
            <Link href="/enter" passHref>
              <div className="nav-button">Log in</div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
