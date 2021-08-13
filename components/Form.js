import React from "react";
import { useForm } from "react-hook-form";

export default function Form({ post, postRef }) {
  return (
    <main>
      {post && (
        <>
          <section>
            <h1>{post.content}</h1>
            <p>{post.location}</p>
            <PostForm postRef={postRef} defaultValues={post} />
          </section>
        </>
      )}
    </main>
  );
}
function PostForm({ defaultValues, postRef }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  console.log(defaultValues);

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content }) => {
    await postRef.update({
      content,
    });

    reset({ content });

    toast.success("Post updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      <textarea
        name="content"
        {...register("message", {
          required: "Required",
        })}
      ></textarea>
      <button type="submit" className="btn-green">
        Save Changes
      </button>
    </form>
  );
}
