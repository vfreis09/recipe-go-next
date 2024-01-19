import { useState, ChangeEvent, FormEvent } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "@/components/Header";

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

interface Props {
  data?: any;
  id?: any;
}

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
    ingredients: data.ingredients,
    instructions: data.instructions,
    categories: data.categories,
  });

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
      <form onSubmit={submitRecipe}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={updatedRecipe.title}
            onChange={updateRecipe}
          />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={updatedRecipe.ingredients}
            onChange={updateRecipe}
          />
        </div>
        <div>
          <label htmlFor="instructions">Instructions:</label>
          <textarea
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
              onChange={updateRecipe}
            />
            Dessert
          </label>
        </div>
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}
