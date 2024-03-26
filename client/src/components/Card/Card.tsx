import Link from "next/link";
import Image from "next/image";
import type { RecipeID } from "@/types/types";
import styles from "./Card.module.css";

export default function Card(props: RecipeID) {
  return (
    <div className={styles.card}>
      <Image
        src="https://picsum.photos/700/200"
        alt="recipe_image"
        width={700}
        height={200}
      ></Image>
      <h1 className={styles.text}>
        <Link href={`/recipes/${props.id}`}>{props.title}</Link>
      </h1>
      <p className={styles.text}>{props.description}</p>
      <Link href={`/search?q=${props.categories}`} className={styles.text}>
        {props.categories}
      </Link>
    </div>
  );
}
