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
  const recipes = data.map((recipe: RecipeData) => {
    return <Recipe key={recipe.id} {...recipe} />;
  });

  return (
    <div>
      <Header />
      {recipes}
    </div>
  );
}
