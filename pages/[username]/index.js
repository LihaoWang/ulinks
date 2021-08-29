import UserProfile from "../../components/UserProfile";
import { getUserWithUsername, postToJSON } from "../../lib/firebase";
import LinksFeedClean from "../../components/LinksFeedClean";
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoWechat,
  IoLogoTiktok,
} from "react-icons/io5";
import { useRouter } from "next/router";
import Head from "next/head";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}
async function getUser(username) {
  return await getUserWithUsername(username);
}

export default function UserProfilePage() {
  const [userState, setUserState] = useState();
  const router = useRouter();
  useEffect(() => {
    const { username } = router.query;

    if (username) {
      getUser(username).then((userDoc) => {
        if (userDoc) {
          const user = userDoc.data();
          setUserState(user);
        } else {
          router.push("404");
        }
      });
    }
  }, []);

  return (
    <div className="user-page">
      {userState && (
        <Head>
          <title>{userState.name}</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
      )}

      {userState && <UserProfile user={userState} />}
      {userState && (
        <div className="links-feed-clean">
          <LinksFeedClean posts={userState.links} />
        </div>
      )}
      <div className="footer">
        <a className="footer-text" href="#">
          Ulinks
        </a>
        <div className="footer-logos">
          <a>
            <IoLogoGithub className="footer-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
