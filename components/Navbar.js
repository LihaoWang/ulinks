import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../lib/context";

import { AiOutlineHome } from "react-icons/ai";
import { RiUserSettingsFill, RiSettings5Fill } from "react-icons/ri";
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
              <div className="nav-button-2">
                <RiSettings5Fill />
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
