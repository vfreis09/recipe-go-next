import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
            <Link href="/recipes">
              <button className={styles.heroButton}>EXPLORE RECIPES</button>
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.categoriesContainer}>
        <div className={styles.textCategoryContainer}>
          <h1>OUR DIVERSE PALETTE</h1>
          <p>
            If you are a breakfast enthusiast, a connoisseur of savory delights,
            or on the lookout for irresistible desserts, our curated selection
            has something to satisfy every palate.
          </p>
          <Link href="/recipes">
            <button className={styles.textCategoryButton}>SEE MORE</button>
          </Link>
        </div>
        <div className={styles.logoContainer}>
          <div className={styles.otherLogoContainer}>
            <Image
              src="/breakfast.png"
              alt="breakfast-image"
              width={50}
              height={50}
            ></Image>
            <p>BREAKFAST</p>
          </div>
          <hr />
          <div className={styles.otherLogoContainer}>
            <Image
              src="/salad.png"
              alt="salad-image"
              width={50}
              height={50}
            ></Image>
            <p>SALAD</p>
          </div>
          <hr />
          <div className={styles.otherLogoContainer}>
            <Image
              src="/mainCourse.png"
              alt="main-course-image"
              width={50}
              height={50}
            ></Image>
            <p>MAIN-COURSE</p>
          </div>
          <hr />
          <div className={styles.otherLogoContainer}>
            <Image
              src="/bakedGoods.png"
              alt="baked-goods-image"
              width={50}
              height={50}
            ></Image>
            <p>BAKED-GOODS</p>
          </div>
          <hr />
          <div className={styles.otherLogoContainer}>
            <Image
              src="/dessert.png"
              alt="dessert-image"
              width={50}
              height={50}
            ></Image>
            <p>DESSERT</p>
          </div>
          <hr />
        </div>
      </div>
      <div className={styles.cardContainer}>
        <h1>FEATURED RECIPES</h1>
        {cards}
      </div>
      <Footer />
    </div>
  );
}
