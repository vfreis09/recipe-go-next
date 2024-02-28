import { useState } from "react";
import Image from "next/image";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Header from "@/components/Header/Header";
import Card from "@/components/Card/Card";
import Footer from "@/components/Footer/Footer";
import type { RecipeID } from "@/types/types";
import styles from "../styles/Home.module.css";

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

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [dataRecipes, setDataRecipes] = useState<RecipeID[]>(data || []);

  const deleteRecipe = async (id: number) => {
    try {
      await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "DELETE",
      });

      //Update state
      const updatedRecipes = dataRecipes.filter(
        (myRecipe) => myRecipe.id !== id
      );

      setDataRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  //Loop on the recipe api and send it to the card component as props
  const cards = dataRecipes.map((recipe: RecipeID) => {
    return <Card key={recipe.id} {...recipe} />;
  });

  return (
    <div>
      <Header />
      <div className={styles.hero}>
        <Image
          layout="responsive"
          width={100}
          height={100}
          className={styles.heroImage}
          src="/hero_image.jpeg"
          alt="hero image"
        ></Image>
        <div className={styles.heroText}>
          <h1>UNLEASH CULINARY EXCELLENCE</h1>
          <p>
            Explore a world of flavors, discover handcrafted recipes, and let
            the aroma of our passion for cooking fill your kitchen
          </p>
          <div>
            <button className={styles.heroButton}>EXPLORE RECIPES</button>
          </div>
        </div>
      </div>
      <div>categories</div>
      <div className={styles.cardContainer}>
        <h1>FEATURED RECIPES</h1>
        {cards}
      </div>
      <Footer />
    </div>
  );
}
