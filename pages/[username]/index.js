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
export async function getServerSideProps({ query }) {
  const { username } = query;
  const userDoc = await getUserWithUsername(username);

  if (!userDoc) {
    return {
      notFound: true,
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref.collection("links");
    // .where("published", "==", true)
    // .limit(5);

    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
}

export default function UserProfilePage({ user, posts }) {
  return (
    <main className="user-page">
      <UserProfile user={user} />
      <div className="links-feed-clean">
        <LinksFeedClean posts={posts} />
      </div>
      <div className="footer">
        <a className="footer-text" href="#">
          Ulinks
        </a>
        {/* <a className="footer-text" href="#">
          Create yours
        </a> */}
        <div className="footer-logos">
          <a className="footer-logo">
            <IoLogoGithub />
          </a>
          <a className="footer-logo">
            <IoLogoLinkedin />
          </a>
        </div>
      </div>
    </main>
  );
}
