import Link from "next/link";
import Image from "next/image";
import type { RecipeProp } from "@/types/types";
import styles from "./Recipe.module.css";

export default function Recipe(props: RecipeProp) {
  const handleDeleteClick = (id: number) => {
    // Call the deleteRecipe function and pass the id to delete the recipe
    props.onDelete(id);
  };

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
        <b>ingredients:</b> {props.ingredients}
      </p>
      <p className={styles.text}>
        <b>instructions:</b> {props.instructions}
      </p>
      <p className={styles.text}>
        <b>category:</b> {props.categories}
      </p>
      <button onClick={() => handleDeleteClick(props.id)}>delete</button>
      <button>
        <Link href={`/recipes/edit/${props.id}`}>edit</Link>
      </button>
    </div>
  );
}
