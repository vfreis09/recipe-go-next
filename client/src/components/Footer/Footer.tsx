import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <p className={styles.logo}>recipegonext</p>
        <div>
          <Link href="/" className={styles.links}>
            HOME
          </Link>
          <Link href="/create-recipe" className={styles.links}>
            CREATE
          </Link>
        </div>
        <div className={styles.links}>socials</div>
      </div>
      <hr />
      <div>
        <p className={styles.copyright}>copyright: © 2024 recipegonext</p>
      </div>
    </div>
  );
}
