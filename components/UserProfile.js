import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoWechat,
  IoLogoTiktok,
} from "react-icons/io5";

import { HiOutlineLocationMarker } from "react-icons/hi";
export default function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div
        className="user-bg"
        style={{ backgroundColor: user.bgColor.hex }}
      ></div>
      <div className="user-bio-section">
        <img
          src={user.photoURL}
          width="180px"
          height="180px"
          className="profile-pic"
          alt="avatar"
        />

        {/* <div className="social-icons-row">
          <a className="social-icon" href="#">
            <IoLogoTiktok />
          </a>
          <a className="social-icon" href="#">
            <IoLogoGithub />
          </a>
          <a className="social-icon" href="#">
            <IoLogoLinkedin />
          </a>
          <a className="social-icon" href="#">
            <IoLogoInstagram />
          </a>
          <a className="social-icon" href="#">
            <IoLogoWechat />
          </a>
        </div> */}
        <h1>{user.name}</h1>
        <p className="user-intro">{user.intro}</p>
        <p className="user-location">
          <HiOutlineLocationMarker /> {user.location}
        </p>
      </div>
    </div>
  );
}
