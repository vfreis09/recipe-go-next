import Link from "next/link";
import Image from "next/image";
import styles from "./Card.module.css";

interface CardProp {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

export default function Card(props: CardProp) {
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
      <p className={styles.text}>
        <b>category:</b> {props.categories}
      </p>
    </div>
  );
}
