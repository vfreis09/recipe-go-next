interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

export default function Recipe(props: RecipeData) {
  function deleteRecipe() {
    console.log("deleted");
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p>ingredients: {props.ingredients}</p>
      <p>instructions: {props.instructions}</p>
      <button onClick={deleteRecipe}>delete</button>
    </div>
  );
}
