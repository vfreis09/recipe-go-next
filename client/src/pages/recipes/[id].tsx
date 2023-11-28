import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Recipe from "@/components/Recipe";

interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
}

interface Props {
  data?: any;
  id?: any;
}

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
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.ingredients}</p>
      <p>{data.instructions}</p>
      <p>{id}</p>
    </div>
  );
}
