import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header";

interface RecipeData {
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
  return (
    <div>
      <Header />
      <h1>{data.name}</h1>
    </div>
  );
}
