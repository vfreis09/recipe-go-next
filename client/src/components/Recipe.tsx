interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}
//Need to update the page when a recipe is deleted and make the page work when theres no recipes
export default function Recipe(props: RecipeData) {
  function deleteRecipe() {
    fetch(`http://localhost:4000/api/recipes/${props.id}`, {
      method: "DELETE",
    });
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
