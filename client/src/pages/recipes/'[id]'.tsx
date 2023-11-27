import type { GetServerSideProps, InferGetServerSidePropsType } from "next";

interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

//Fetch data from database
export const getServerSideProps = (async (id) => {
  const res = await fetch(`http://localhost:4000/api/recipes/${id}`);
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: RecipeData;
}>;
