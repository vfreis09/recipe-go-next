import Link from "next/link";

export default function Header() {
  return (
    <div>
      <Link href="/">Home</Link>
      <Link href="/create-recipe">Create</Link>
      <div>
        <Link href="/login">Login</Link>
        <Link href="/signup">Signup</Link>
      </div>
    </div>
  );
}
