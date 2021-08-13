import Link from "next/link";
import { firestore, auth, serverTimestamp } from "../lib/firebase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import link from "next/link";
import { useState } from "react";

import { AiFillEdit } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
export default function LinksFeed({ posts, admin }) {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
}
function PostItem({ post, admin = false }) {
  const [edit, setEdit] = useState(false);
  // const deleteItem = async (e) => {
  //   e.preventDefault();
  //   const postSlug = post.slug;
  //   const uid = auth.currentUser.uid;
  //   const ref = firestore
  //     .collection("users")
  //     .doc(uid)
  //     .collection("links")
  //     .doc(postSlug);

  //   ref.delete();

  //   toast.success("Deleted!");
  // };
  const editPost = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };
  const linkRef = firestore
    .collection("users")
    .doc(auth.currentUser.uid)
    .collection("links")
    .doc(post.slug);

  return (
    <div className="admin-card">
      <div onClick={editPost} className="admin-card-edit-wrapper">
        <div className="admin-card-title-url">
          <p className="link-title">{post.title}</p>
          <p className="link-url">{post.url}</p>
        </div>
        <div>
          <button className="edit-button" onClick={editPost}>
            <FiEdit />
          </button>
        </div>
      </div>
      {/* <button onClick={deleteItem}>delete item</button> */}
      <div></div>
      <div>{edit && <EditForm defaultValues={post} linkRef={linkRef} />}</div>
    </div>
  );
}

function EditForm({ defaultValues, linkRef }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const updateLink = async ({ title, url }) => {
    await linkRef.update({
      title,
      url,
    });
  };
  const deleteItem = async (e) => {
    e.preventDefault();
    const postSlug = defaultValues.slug;
    const uid = auth.currentUser.uid;
    const ref = firestore
      .collection("users")
      .doc(uid)
      .collection("links")
      .doc(postSlug);

    ref.delete();

    toast.success("Deleted!");
  };
  return (
    <form className="edit-form-wrapper" onSubmit={handleSubmit(updateLink)}>
      <p className="form-title">Title</p>
      <input className="form-input" name="title" {...register("title")}></input>
      <p className="form-title">URL</p>

      <input className="form-input" name="url" {...register("url")}></input>
      <div className="edit-buttons-wrapper">
        <button type="submit" className="submit-btn">
          Save
        </button>

        <button className="text-btn" onClick={deleteItem}>
          Delete
        </button>
      </div>
    </form>
  );
}
