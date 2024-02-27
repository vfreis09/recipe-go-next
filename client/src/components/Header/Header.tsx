import styles from "./Header.module.css";
import Link from "next/link";
import SearchInput from "../Search/Search";

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.logo}>
        recipegonext
      </Link>
      <div className={styles.links}>
        <Link href="/create-recipe">CREATE</Link>
        <Link href="/recipes">RECIPES</Link>
      </div>
      <SearchInput />
    </div>
  );
}
