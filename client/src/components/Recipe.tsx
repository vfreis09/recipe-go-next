import Link from "next/link";

interface RecipeProp {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  onDelete: (id: number) => void;
}

export default function Recipe(props: RecipeProp) {
  const handleDeleteClick = (id: number) => {
    // Call the deleteRecipe function and pass the id to delete the recipe
    props.onDelete(id);
  };

  return (
    <div>
      <h1>
        <Link href={`/recipes/${props.id}`}>{props.title}</Link>
      </h1>
      <p>ingredients: {props.ingredients}</p>
      <p>instructions: {props.instructions}</p>
      <button onClick={() => handleDeleteClick(props.id)}>delete</button>
      <button>
        <Link href={`/recipes/edit/${props.id}`}>edit</Link>
      </button>
    </div>
  );
}
