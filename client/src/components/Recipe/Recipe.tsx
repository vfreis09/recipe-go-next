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
      <div className={styles.categoryContainer}>
        <button className={styles.category}>
          <Link href={`/search?q=${props.categories}`}>{props.categories}</Link>
        </button>
      </div>
      <h1 className={styles.title}>
        <Link href={`/recipes/${props.id}`}>{props.title}</Link>
      </h1>
      <Image
        src="https://picsum.photos/700/200"
        alt="recipe_image"
        width={700}
        height={200}
      ></Image>
      <p className={styles.text}>{props.description}</p>
      <h2>Ingredients</h2>
      <p className={styles.text}>{props.ingredients}</p>
      <h2>Instructions</h2>
      <p className={styles.text}>{props.instructions}</p>
      <button onClick={() => handleDeleteClick(props.id)}>delete</button>
      <button>
        <Link href={`/recipes/edit/${props.id}`}>edit</Link>
      </button>
      <h1>similar recipes</h1>
    </div>
  );
}
