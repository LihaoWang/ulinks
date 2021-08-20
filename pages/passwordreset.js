/* eslint-disable  */
import { auth } from "../lib/firebase";
import { useContext, useState, useEffect, useCallback, useMemo } from "react";
import { UserContext } from "../lib/context";

import { useForm } from "react-hook-form";

import Head from "next/head";
export default function Enter(props) {
  const { user, username } = useContext(UserContext);

  return (
    <div>
      <Head>
        <title>Password Reset</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      {!user ? <ResetForm /> : <LogOut />}
    </div>
  );
}

function LogOut() {
  async function signOut(e) {
    e.preventDefault();
    await auth.signOut();
  }
  return (
    <div className="sign-up-wrapper">
      <h2 style={{ alignSelf: "center" }}>You've already logged in.</h2>
      <button
        style={{ alignSelf: "center", backgroundColor: "#de0000" }}
        className="submit-btn"
        onClick={signOut}
      >
        Sign Out
      </button>
    </div>
  );
}

function ResetForm() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onSubmit(data) {
    try {
      setError("");
      setMessage("");
      await signIn(data.email);
      setMessage("Please check your email inbox for instructions");
    } catch {
      setError("Reset password failed");
    }
  }
  function signIn(email) {
    return auth.sendPasswordResetEmail(email);
  }
  return (
    <div className="sign-up-wrapper">
      <h1 style={{ alignSelf: "center" }}>Password Reset</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="form-wrapper">
        <p className="form-title">Email</p>
        <input
          {...register("email", {
            required: "Please enter your email",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Entered value does not match email format",
            },
          })}
          className="form-input"
        />
        {errors.email && <span className="error">{errors.email.message}</span>}
        {error && <span className="error">{error}</span>}
        {message && <span className="error">{message}</span>}
        <button className="submit-btn" type="submit">
          Reset password
        </button>
      </form>
    </div>
  );
}
