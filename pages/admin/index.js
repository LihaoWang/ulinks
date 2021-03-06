// import styles from "../../styles/Admin.module.css";
import AuthCheck from "../../components/AuthCheck";
import LinksFeed from "../../components/LinksFeed";
import Drag from "../../components/Drag";
import Footer from "../../components/Footer";
import ImageUploader from "../../components/ImageUploader";
// import ColorPicker from "../../components/ColorPicker";
import Head from "next/head";
import { TwitterPicker } from "react-color";
import { UserContext } from "../../lib/context";
import { firestore, auth, serverTimestamp } from "../../lib/firebase";

import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

import {
  useCollection,
  useDocumentData,
  useDocumentDataOnce,
} from "react-firebase-hooks/firestore";
import kebabCase from "lodash.kebabcase";
import toast from "react-hot-toast";
import { AiFillPlusCircle, AiFillCloseCircle } from "react-icons/ai";

export default function AdminPostsPage() {
  const router = useRouter();
  async function signOut(e) {
    e.preventDefault();
    await router.push("/");
    await auth.signOut();
  }
  return (
    <div className="admin-page">
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <AuthCheck>
        <h1>Dashboard</h1>
        <BioSection />
        <div style={{ paddingBottom: "150px" }}>
          <button
            style={{ alignSelf: "center", backgroundColor: "#de0000" }}
            className="submit-btn"
            onClick={signOut}
          >
            Sign Out
          </button>
        </div>
        {/* <div className="add-new-btn">
          <button className="text-btn" onClick={handleAddNew}>
            {!addNew ? (
              <>
                <AiFillPlusCircle style={{ marginRight: "5px" }} />
                Add New Link
              </>
            ) : (
              <>
                <AiFillCloseCircle style={{ marginRight: "5px" }} />
                Cancel
              </>
            )}
          </button>
        </div>
        {addNew && <CreateNewPost />} */}
        {/* <LinksList /> */}
        <Footer />
      </AuthCheck>
    </div>
  );
}
function BioSection() {
  const postRef = firestore.collection("users").doc(auth.currentUser.uid);

  const [post] = useDocumentData(postRef);

  return (
    <main className="bio-section-wrapper">
      {post && (
        <>
          <section>
            {/* <div className="avatar-background"></div> */}
            {/* <p>https://ulinks.cool/{post.username}</p> */}
            <Avatar post={post} />

            <BioForm postRef={postRef} defaultValues={post} />

            <h1 style={{ marginTop: "50px", textAlign: "center" }}>
              Manage your Links
            </h1>

            <Drag post={post.links} />
            <div></div>
          </section>
        </>
      )}
    </main>
  );
}
function Avatar({ post }) {
  return (
    <div
      className="avatar-wrapper"
      style={{
        backgroundColor: post.bgColor.hex,
      }}
    >
      <img
        src={post.photoURL}
        className="profile-pic-admin"
        alt="avatar"
        // width="120px"
        // height="120px"
      />
      <ImageUploader />
    </div>
  );
}

function BioForm({ defaultValues, postRef }) {
  const [newColor, setNewColor] = useState(defaultValues.bgColor);
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const { isValid, isDirty } = formState;
  const handleChangeComplete = (color) => {
    setNewColor(color);
  };

  const updateBio = async ({ name, location, intro, bgColor }) => {
    await postRef.update({
      name,
      location,
      intro,
      bgColor: newColor,
    });

    reset({ name, location, intro, bgColor });

    toast.success("Updated successfully!");
  };

  return (
    <div>
      <form className="form-wrapper" onSubmit={handleSubmit(updateBio)}>
        <div className="change-bg">
          <p className="form-title">Background Color</p>

          <div style={{ marginBottom: "10px" }}>
            <TwitterPicker
              color={newColor}
              onChangeComplete={handleChangeComplete}
              triangle="hide"
              className="twitter-picker"
            />
          </div>
        </div>

        <p className="form-title">Name</p>
        <div>
          <input
            className="form-input"
            name="name"
            {...register("name")}
          ></input>
        </div>
        <p className="form-title">Location</p>

        <input
          className="form-input"
          name="location"
          {...register("location")}
        ></input>

        <p className="form-title">Bio</p>
        <textarea
          className="input-area"
          name="intro"
          {...register("intro")}
        ></textarea>
        <div>
          <button type="submit" className="submit-btn">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

function LinksList() {
  const ref = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("links");
  // const query = ref.orderBy("createdAt");

  const [querySnapshot] = useCollection(ref);
  const links = querySnapshot?.docs.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Links</h1>
      <LinksFeed posts={links} admin />
    </>
  );
}
function CreateNewPost() {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [url, setURL] = useState("");

  // Ensure slug is URL safe
  const slug = encodeURI(kebabCase(title));

  // Validate length
  const isValid = title.length > 3 && title.length < 100;

  // Create a new post in firestore
  const createPost = async (e) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("links")
      .doc(slug);

    // Tip: give all fields a default value here
    const data = {
      title,
      url,
      slug,
      uid,
      username,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await ref.set(data);

    toast.success("Post created!");
    setTitle("");
    setURL("");
    // Imperative navigation after doc is set
    // router.push(`/admin/${slug}`);
  };

  return (
    <form className="form-wrapper" onSubmit={createPost}>
      <p className="form-title">Title</p>
      <input
        className="form-input"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <p className="form-title">URL</p>
      <input
        className="form-input"
        value={url}
        onChange={(e) => setURL(e.target.value)}
        placeholder="URL"
      />
      {/* <p>
        <strong>Slug:</strong> {slug}
      </p> */}
      <div>
        <button className="submit-btn" type="submit" disabled={!isValid}>
          Add New Link
        </button>
      </div>
    </form>
  );
}
