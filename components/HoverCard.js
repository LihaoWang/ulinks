import React from "react";
import styles from "./HoverCard.module.css";
function HoverCard() {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>How it works</h1>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src="square1.png" />
          </div>
          <div className={styles.content}>
            <h2>Sign up</h2>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src="square2.png" />
          </div>
          <div className={styles.content}>
            <h2>Add links</h2>
            {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p> */}
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.imgBx}>
            <img src="square3.png" />
          </div>
          <div className={styles.content}>
            <h2>Share it</h2>
            {/* <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </p> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default HoverCard;
