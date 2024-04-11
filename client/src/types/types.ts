export interface Recipe {
  title: string | undefined;
  description: string | undefined;
  ingredients: string | undefined;
  instructions: string | undefined;
  categories: string | undefined;
}

export interface RecipeID {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: string;
}

export interface RecipeProp {
  id: number;
  title: string;
  description: string;
  ingredients: string;
  instructions: string;
  categories: string;
  onDelete: (id: number) => void;
}

export interface ModalState {
  isOpen: boolean;
}

export interface Props {
  data: RecipeID;
  id?: string;
}
