import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header";
import SearchInput from "@/components/Search";

interface RecipeData {
  id: number;
  title: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

// Fetch data from database
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:4000/api/search?q=${context.query.q}`
  );
  const data: RecipeData[] = await res.json();
  return { props: { data } };
};

const SearchPage: React.FC<
  InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
  if (!data) {
    return <div>Sorry, nothing was found!</div>;
  }

  return (
    <div>
      <Header />
      <SearchInput />
      {data.map((recipe: RecipeData) => (
        <div key={recipe.id}>{recipe.title}</div>
      ))}
    </div>
  );
};

export default SearchPage;
