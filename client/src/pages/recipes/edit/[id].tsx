import React, { useState, ChangeEvent, FormEvent } from "react";
import type { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Header from "@/components/Header";

interface Recipe {
  title: string;
  ingredients: string;
  instructions: string;
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
  });

  console.log(updatedRecipe);

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

    try {
      const response = await fetch(`http://localhost:4000/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("API Response:", responseData);
        // reset the form after a successful submission
        setUpdatedRecipe({
          title: "",
          ingredients: "",
          instructions: "",
        });
      } else {
        console.error("API Error:", response.status);
      }
    } catch (error) {
      console.error("API Error:", error);
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
        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
}
