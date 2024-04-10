import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Link from "next/link";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { RecipeID } from "@/types/types";
import styles from "../../styles/SearchPage.module.css";

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
    <div className={styles.container}>
      <Header />
      <div className={styles.recipeContainer}>
        {data.map((recipe: RecipeID) => (
          <div key={recipe.id} className={styles.searchCard}>
            <h2 className={styles.title}>
              <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
            </h2>
            <p className={styles.description}>{recipe.description}</p>
            <p>
              <b>Category: </b> {recipe.categories}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
