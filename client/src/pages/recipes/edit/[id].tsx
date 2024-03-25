import { useState, ChangeEvent, FormEvent } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import type { Recipe, Props } from "@/types/types";
import styles from "../../../styles/Create.module.css";

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

export default function EditForm({
  data,
  id,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [updatedRecipe, setUpdatedRecipe] = useState<Recipe>({
    title: data.title,
    description: data.description,
    ingredients: data.ingredients,
    instructions: data.instructions,
    categories: data.categories,
  });

  console.log(data);

  const updateRecipe = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedRecipe({
      ...updatedRecipe,
      [name]: value,
    });
  };

  const submitRecipe = async (e: FormEvent) => {
    e.preventDefault();

    if (
      updatedRecipe.title &&
      updatedRecipe.description &&
      updatedRecipe.ingredients &&
      updatedRecipe.instructions &&
      updatedRecipe.categories
    ) {
      try {
        const response = await fetch(
          `http://localhost:4000/api/recipes/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRecipe),
          }
        );

        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
          // reset the form after a successful submission
          setUpdatedRecipe({
            title: "",
            description: "",
            ingredients: "",
            instructions: "",
            categories: "",
          });
        } else {
          console.error("API Error:", response.status);
        }
      } catch (error) {
        console.error("API Error:", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <form onSubmit={submitRecipe}>
          <div>
            <label htmlFor="title">Title:</label>
            <input
              className={styles.titleInput}
              type="text"
              id="title"
              name="title"
              value={updatedRecipe.title}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              className={styles.textArea}
              id="description"
              name="description"
              value={updatedRecipe.description}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="ingredients">Ingredients:</label>
            <textarea
              className={styles.textArea}
              id="ingredients"
              name="ingredients"
              value={updatedRecipe.ingredients}
              onChange={updateRecipe}
            />
          </div>
          <div>
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              className={styles.textArea}
              id="instructions"
              name="instructions"
              value={updatedRecipe.instructions}
              onChange={updateRecipe}
            />
          </div>
          <div>
            Category:
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="breakfast"
                checked={updatedRecipe.categories === "breakfast"}
                onChange={updateRecipe}
              />
              Breakfast
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="appetizer"
                checked={updatedRecipe.categories === "appetizer"}
                onChange={updateRecipe}
              />
              Appetizer
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="salad"
                checked={updatedRecipe.categories === "salad"}
                onChange={updateRecipe}
              />
              Salad
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="main-course"
                checked={updatedRecipe.categories === "main-course"}
                onChange={updateRecipe}
              />
              Main-course
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="side-dish"
                checked={updatedRecipe.categories === "side-dish"}
                onChange={updateRecipe}
              />
              Side-dish
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="baked-goods"
                checked={updatedRecipe.categories === "baked-goods"}
                onChange={updateRecipe}
              />
              Baked-goods
            </label>
            <label>
              <input
                id="categories"
                name="categories"
                type="radio"
                value="dessert"
                checked={updatedRecipe.categories === "dessert"}
                onChange={updateRecipe}
              />
              Dessert
            </label>
          </div>
          <button type="submit" className={styles.submitButton}>
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
