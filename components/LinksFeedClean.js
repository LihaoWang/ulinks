import { AiOutlineLink, AiOutlineArrowRight } from "react-icons/ai";
import { FiArrowRightCircle } from "react-icons/fi";
import { IoIosArrowDropright } from "react-icons/io";
export default function LinksFeedClean({ posts, admin }) {
  return (
    <div className="links-feed-clean">
      {posts
        ? posts.map((post) => (
            <PostItem post={post} key={post.id} admin={admin} />
          ))
        : null}
    </div>
  );
}
function PostItem({ post, admin = false }) {
  return (
    <div className="card-wrapper">
      <a href={post.url}>
        <div className="card">
          {/* <img className="arrow-invisible" width="25px" src="arrow.svg" /> */}
          <AiOutlineLink className="link-icon" style={{ fontSize: "30px" }} />
          <div className="title-url-wrapper">
            <p className="feed-title">{post.title}</p>
            <p className="feed-url">{post.url}</p>
          </div>
          <IoIosArrowDropright className="arrow" />
          {/* <img className="arrow" width="25px" src="arrow.svg" /> */}
        </div>
      </a>
    </div>
  );
}
