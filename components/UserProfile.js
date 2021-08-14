import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoWechat,
  IoLogoTiktok,
} from "react-icons/io5";
import Image from "next/image";
import { HiOutlineLocationMarker } from "react-icons/hi";
export default function UserProfile({ user }) {
  return (
    <div className="user-profile">
      <div
        className="user-bg"
        style={{ backgroundColor: user.bgColor.hex }}
      ></div>
      <div className="user-bio-section">
        <Image
          width={120}
          height={120}
          src={user.photoURL}
          className="profile-pic"
          alt="avatar"
          layout="fixed"
        />
        <div className="social-icons-row">
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
        </div>
        <h1>{user.name}</h1>
        <p className="user-intro">{user.intro}</p>
        <p className="user-location">
          <HiOutlineLocationMarker /> {user.location}
        </p>
      </div>
    </div>
  );
}
