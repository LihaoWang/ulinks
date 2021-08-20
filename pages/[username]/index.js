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

import Head from "next/head";
export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  // let posts = null;

  if (userDoc) {
    user = userDoc.data();
    // const postsQuery = userDoc.ref.collection("links");
    // .where("published", "==", true)
    // .limit(5);

    // posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user },
  };
}

export default function UserProfilePage({ user }) {
  return (
    <div className="user-page">
      <Head>
        <title>{user.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <UserProfile user={user} />
      <div className="links-feed-clean">
        <LinksFeedClean posts={user.links} />
      </div>
      <div className="footer">
        <a className="footer-text" href="#">
          Ulinks
        </a>
        {/* <a className="footer-text" href="#">
          Create yours
        </a> */}
        <div className="footer-logos">
          <a>
            <IoLogoGithub className="footer-logo" />
          </a>
        </div>
      </div>
    </div>
  );
}
