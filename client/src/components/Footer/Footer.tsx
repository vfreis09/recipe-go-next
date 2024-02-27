import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.linkContainer}>
        <Link href="/" className={styles.logo}>
          recipegonext
        </Link>
        <div>
          <Link href="/create-recipe" className={styles.links}>
            CREATE
          </Link>
          <Link href="/create-recipe" className={styles.links}>
            RECIPES
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
