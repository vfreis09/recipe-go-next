import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type Recipe = {
  Name: string;
};

export const getServerSideProps = (async () => {
  const res = await fetch("http://localhost:4000");
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: Recipe;
}>;

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  //return <h1>hello world</h1>;
  return <h1>{data.name}</h1>;
}
