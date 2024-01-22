import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import SearchInput from "@/components/Search";

//Fetch data from database
export const getServerSideProps = (async (context) => {
  console.log(context.query);
  const res = await fetch(
    `http://localhost:4000/api/search?q=${context.query}`
  );
  const data = await res.json();
  return { props: { data } };
}) satisfies GetServerSideProps<{
  data: any;
}>;

const SearchPage = (): //data
InferGetServerSidePropsType<typeof getServerSideProps> => {
  //const search = useSearchParams();
  //const searchQuery = search.get("q");
  //const encodedSearchQuery = encodeURI(searchQuery || "");
  //return (
  //<div>
  //<SearchInput />
  //{data.map((recipe) => {
  //<div>{recipe.title}</div>);}
  //</div>
  //);
};

export default SearchPage;
