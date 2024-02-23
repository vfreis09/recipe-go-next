import Link from "next/link";
import Image from "next/image";
import styles from "./Recipe.module.css";

interface RecipeProp {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  categories: string;
  onDelete: (id: number) => void;
}

export default function Recipe(props: RecipeProp) {
  const handleDeleteClick = (id: number) => {
    // Call the deleteRecipe function and pass the id to delete the recipe
    props.onDelete(id);
  };

  return (
    <div className={styles.card}>
      <Image
        src="https://picsum.photos/800/400"
        alt="recipe_image"
        width={800}
        height={400}
      ></Image>
      <h1>
        <Link href={`/recipes/${props.id}`}>{props.title}</Link>
      </h1>
      <p>ingredients: {props.ingredients}</p>
      <p>category: {props.categories}</p>
      <button onClick={() => handleDeleteClick(props.id)}>delete</button>
      <button>
        <Link href={`/recipes/edit/${props.id}`}>edit</Link>
      </button>
    </div>
  );
}
