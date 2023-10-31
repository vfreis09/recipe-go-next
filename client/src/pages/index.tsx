import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header";
import Recipe from "@/components/Recipe";

interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

//fetch data from database
export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:4000/api/recipes");
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: RecipeData;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const deleteRecipe = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Recipe was successfully deleted, you can update your state or perform any other actions
      } else {
        // Handle error if the deletion was not successful
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  //Loop on the recipe api and send it to the recipe component as props
  const recipes = data.map((recipe: RecipeData) => {
    return <Recipe key={recipe.id} onDelete={deleteRecipe} {...recipe} />;
  });

  return (
    <div>
      <Header />
      {recipes}
    </div>
  );
}
