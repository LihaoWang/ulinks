/* eslint-disable  */
import { auth, googleAuthProvider } from "../lib/firebase";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { UserContext } from "../lib/context";
import { firestore } from "../lib/firebase";
import debounce from "lodash.debounce";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineGoogle, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";
import router, { useRouter } from "next/router";
export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <div style={{ margin: "auto", width: "50%" }}>
            <h2 style={{ alignSelf: "center" }}>
              You've logged in successfully. Go to{" "}
              <Link href="/admin" passHref>
                dashboard
              </Link>
            </h2>
          </div>
        )
      ) : (
        <SignUpForm />
      )}
    </main>
  );
}

function SignUpForm() {
  const [error, setError] = useState("");
  const router = useRouter();
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  };
  const signInAnonymously = async () => {
    await auth.signInAnonymously();
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    if (data.password !== data.passwordConfirm) {
      return setError("Password doesn't match");
    }
    try {
      setError("");
      await signUp(data.email, data.password);
    } catch {
      setError("Sign up failed");
    }
  }
  function signUp(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  return (
    <div className="sign-up-wrapper">
      <h1 style={{ alignSelf: "center" }}>Create an account</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <p className="form-title">Email</p>
        <input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          className="form-input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}

        <p className="form-title">Password</p>
        <input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Minimum password length is 5",
            },
          })}
          className="form-input"
        />
        {errors.password && (
          <span className="error">{errors.password.message}</span>
        )}

        <p className="form-title">Confirm Password</p>
        <input
          type="password"
          {...register("passwordConfirm", { required: true })}
          className="form-input"
        />
        {error && <span className="error">{error}</span>}

        <button className="submit-btn" type="submit">
          Sign up
        </button>
      </form>
      <button className="btn-google" onClick={signInWithGoogle}>
        <FcGoogle style={{ marginRight: "10px", fontSize: "22px" }} />
        Sign in with Google
      </button>

      <button
        className="btn-google bg-color-black"
        onClick={signInAnonymously}
        style={{ marginTop: "20px" }}
      >
        <AiFillEyeInvisible
          style={{
            marginRight: "10px",
            fontSize: "22px",
          }}
        />
        Sign in Anonymously
      </button>

      <p style={{ alignSelf: "center", marginTop: "30px" }}>
        Already have an account?{" "}
        <Link href={"/login"} passHref>
          Sign in
        </Link>
      </p>
    </div>
  );
}

function UsernameForm() {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);
  const onSubmit = async (e) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = firestore.batch();
    const defaultAvatar =
      "https://firebasestorage.googleapis.com/v0/b/ulinks-app.appspot.com/o/default-avatar.png?alt=media&token=b4424698-af50-42fd-bf6a-e0d12af33160";
    batch.set(userDoc, {
      username: formValue,
      photoURL: defaultAvatar,
      name: formValue,
      links: [{ url: "example.com", title: "example", id: "example" }],
      bgColor: { hex: "#cccccc" },
      location: "",
      intro: "",
    });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };
  const onChange = (e) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };
  useEffect(() => {
    checkUsername(formValue);
    // eslint-disable-line
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const ref = firestore.doc(`usernames/${username}`);
        const { exists } = await ref.get();
        console.log("Firestore read executed!");
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),

    []
  ); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    !username && (
      <section className="sign-up-wrapper">
        <h1>Choose your username</h1>
        <form className="form-wrapper" onSubmit={onSubmit}>
          <input
            className="form-input"
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="submit-btn" disabled={!isValid}>
            Choose
          </button>

          {/* <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div> */}
        </form>
      </section>
    )
  );
}
function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return (
      <>
        <p className="text-success">
          Your unique address will be <em>ulinks.app/{username}</em>
          <br />
        </p>

        <strong>This address cannot be changed later!</strong>
      </>
    );
  } else if (username && !isValid) {
    return <p className="text-danger">ooops! That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
