import { useState } from "react";
import { auth, storage, STATE_CHANGED, firestore } from "../lib/firebase";
import Loader from "./Loader";

// Uploads images to Firebase Storage
export default function ImageUploader() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  //   const [downloadURL, setDownloadURL] = useState(null);

  // Creates a Firebase Upload Task
  const uploadFile = async (e) => {
    // Get the file
    const file = Array.from(e.target.files)[0];
    const extension = file.type.split("/")[1];
    const postRef = firestore.collection("users").doc(auth.currentUser.uid);
    // Makes reference to the storage bucket location
    const ref = storage.ref(
      `avatars/${auth.currentUser.uid}/avatar.${extension}`
    );
    setUploading(true);

    // Starts the upload
    const task = ref.put(file);

    // Listen to updates to upload task
    task.on(STATE_CHANGED, (snapshot) => {
      const pct = (
        (snapshot.bytesTransferred / snapshot.totalBytes) *
        100
      ).toFixed(0);
      setProgress(pct);
    });

    // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
    task
      .then((d) => ref.getDownloadURL())
      .then((url) => {
        // setDownloadURL(url);
        setUploading(false);
        postRef.update({
          photoURL: String(url),
        });
      });
  };
  const updateAvatar = async ({ downloadURL }) => {
    const postRef = firestore.collection("users").doc(auth.currentUser.uid);
    await postRef.update({
      photoURL: String(downloadURL),
    });
    console.log(downloadURL);
  };

  return (
    <div>
      <Loader show={uploading} />
      {uploading && <h3>{progress}%</h3>}

      {!uploading && (
        <>
          <label className="upload-btn">
            Upload Photo
            <input
              type="file"
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
            />
          </label>
        </>
      )}

      {/* {downloadURL && <code className="upload-snippet">{downloadURL}</code>} */}
    </div>
  );
}
