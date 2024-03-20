import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import styles from "@/styles/Recipes.module.css";

export default function RecipesPage() {
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
        <div>cards</div>
      </div>
      <Footer />
    </div>
  );
}
