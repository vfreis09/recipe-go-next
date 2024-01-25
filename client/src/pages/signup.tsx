import Header from "@/components/Header";
import { useState, ChangeEvent, FormEvent } from "react";

const SignupPage = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  function updateUser(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  const submitUser = async (e: FormEvent) => {
    e.preventDefault();

    if (user.username && user.email && user.password) {
      try {
        const response = await fetch("http://localhost:4000/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        });
        if (response.ok) {
          const responseData = await response.json();
          console.log("API Response:", responseData);
          setUser({
            username: "",
            email: "",
            password: "",
          });
        } else {
          console.error(response.status);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={submitUser}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={updateUser}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={updateUser}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={updateUser}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupPage;
