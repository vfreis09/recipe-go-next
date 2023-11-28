import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "@/components/Header";
import Recipe from "@/components/Recipe";

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
      <Header />
      <Recipe key={id} onDelete={data.deleteRecipe} {...data} />
    </div>
  );
}
