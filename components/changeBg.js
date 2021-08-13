import { firestore, auth, serverTimestamp } from "../../lib/firebase";

export default function changeBg({ defaultValues, postRef }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({
    defaultValues,
    mode: "onChange",
  });
  const updateBg = async ({ bgColor }) => {
    await postRef.update({
      bgColor,
    });

    reset({ bgColor });

    toast.success("Post updated successfully!");
  };
  return (
    <form className="form-wrapper" onSubmit={handleSubmit(updateBio)}>
      <p className="form-title">Bgcolor</p>
      <div>
        <input
          className="form-input"
          name="bgColor"
          {...register("bgColor")}
        ></input>
      </div>
    </form>
  );
}
