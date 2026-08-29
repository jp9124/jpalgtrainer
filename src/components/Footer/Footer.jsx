import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      Uses{" "}
      <a href="https://github.com/cubing/cubing.js" target="_blank" rel="noopener noreferrer">
        cubing.js
      </a>{" "}
      for puzzle rendering &amp; move logic. Built-in algorithms sourced from public solving
      guides &mdash; add your own via the Custom Set box.
    </footer>
  );
}
