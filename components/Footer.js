import { IoLogoGithub } from "react-icons/io5";

export default function Footer() {
  return (
    <div className="footer">
      <a className="footer-text" href="#">
        Ulinks
      </a>

      <div className="footer-logos">
        <a href="https://github.com/LihaoWang/ulinks">
          <IoLogoGithub className="footer-logo" />
        </a>
      </div>
    </div>
  );
}
