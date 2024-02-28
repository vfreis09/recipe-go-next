import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "@/components/Header/Header";
import Recipe from "@/components/Recipe/Recipe";
import Footer from "@/components/Footer/Footer";
import type { Props } from "@/types/types";

//Fetch data from database
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { id } = context.query;
  const res = await fetch(`http://localhost:4000/api/recipes/${id}`);
  const data = await res.json();

  const myProps: Props = { data, id };
  return { props: myProps };
};

export default function GetRecipeById({
  data,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const deleteRecipe = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "DELETE",
      });

      //Update state
      //const updatedRecipes = dataRecipes.filter(
      //(myRecipe) => myRecipe.id !== id
      //);

      //setDataRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (
    <div>
      <Header />
      <Recipe key={id} {...data} />
      <Footer />
    </div>
  );
}
