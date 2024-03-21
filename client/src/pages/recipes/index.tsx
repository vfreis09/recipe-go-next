import { useState } from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import type { RecipeID } from "@/types/types";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "@/styles/Recipes.module.css";
import Card from "@/components/Card/Card";

// Fetch data from database
export const getServerSideProps = (async () => {
  try {
    const res = await fetch("http://localhost:4000/api/recipes");
    const data = await res.json();
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { props: { data: [] } }; // Return an empty array if fetching fails
  }
}) as GetServerSideProps<{ data: RecipeID[] }>;

export default function RecipesPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dataRecipes, setDataRecipes] = useState<RecipeID[]>(data || []);

  const cards = dataRecipes.map((recipe: RecipeID) => {
    return <Card key={recipe.id} {...recipe} />;
  });

  return (
    <div className={styles.pageContainer}>
      <Header />
      <div className={styles.container}>
        <div>
          <h2>EMBARK ON A JORNEY</h2>
          <p>
            With our diverse collection of recipes we have something to satisfy
            every plate.
          </p>
        </div>
        <div>
          <button className={styles.button}>all</button>
          <button className={styles.button}>breakfast</button>
          <button className={styles.button}>appetizer</button>
          <button className={styles.button}>salad</button>
          <button className={styles.button}>main-course</button>
          <button className={styles.button}>side-dish</button>
          <button className={styles.button}>baked-goods</button>
          <button className={styles.button}>dessert</button>
        </div>
        <div className={styles.cardContainer}>{cards}</div>
      </div>
      <Footer />
    </div>
  );
}
