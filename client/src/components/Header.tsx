import Link from "next/link";
import SearchInput from "./Search";

export default function Header() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/create-recipe">Create</Link>
      <SearchInput />
    </div>
  );
}
