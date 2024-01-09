import Image from "next/image";

interface RecipeProp {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  image: string;
  onDelete: (id: number) => void;
}

export default function Recipe(props: RecipeProp) {
  const handleDeleteClick = (id: number) => {
    // Call the deleteRecipe function and pass the id to delete the recipe
    props.onDelete(id);
  };

  return (
    <div>
      <h1>{props.title}</h1>
      <p>ingredients: {props.ingredients}</p>
      <p>instructions: {props.instructions}</p>
      <Image
        unoptimized={true}
        loader={() => props.image}
        src={props.image}
        width={500}
        height={500}
        alt="recipe image"
      />
      <button onClick={() => handleDeleteClick(props.id)}>delete</button>
    </div>
  );
}
