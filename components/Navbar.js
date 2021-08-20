import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";
import { FaUserCircle } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
export default function NavBar({}) {
  const { user, username } = useContext(UserContext);
  return (
    <nav>
      <div className="navbar">
        <Link href="/" passHref>
          <div className="nav-logo">Ulinks</div>
        </Link>

        {username && (
          <div className="nav-buttons">
            {/* <div className="nav-button">Sign Out</div> */}
            <Link href="/admin" passHref>
              <div className="nav-button-2">
                <FaUserCircle />
              </div>
            </Link>
            <Link href={`/${username}`} passHref>
              <div className="nav-button">My Page</div>
            </Link>
          </div>
        )}

        {!username && (
          <div className="nav-buttons">
            <Link href="/enter" passHref>
              <div className="nav-button">Sign up</div>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
