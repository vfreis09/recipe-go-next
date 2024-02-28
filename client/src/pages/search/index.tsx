import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { RecipeID } from "@/types/types";

// Fetch data from database
export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(
    `http://localhost:4000/api/search?q=${context.query.q}`
  );
  const data: RecipeID[] = await res.json();
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
      {data.map((recipe: RecipeID) => (
        <div key={recipe.id}>
          <h2>
            <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </h2>
          <p>{recipe.description}</p>
          <p>
            <b>Ingredients:</b> {recipe.ingredients}
          </p>
          <p>
            <b>Instructions:</b> {recipe.instructions}
          </p>
          <p>
            <b>Categories:</b> {recipe.categories}
          </p>
        </div>
      ))}
      <Footer />
    </div>
  );
};

export default SearchPage;
