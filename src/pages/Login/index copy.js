import React from "react";
import api from "../../services/api";

export default function Login({ history }) {
  const [email, setEmail] = React.useState("");

  async function handleSubmit(event) {
    // event.preventDefault();
    const response = await api.post("/login", { email });
    console.log(response);

    // const { _id } = response.data;
    // localStorage.setItem("user", _id);
    // history.push("/dashboard");
  }
  return (
    <>
      <p>
        Ofereça <strong>Spots</strong> para programadores e encontre{" "}
        <strong>talentos</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">E-mail *</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={event => setEmail(event.target.value)}
        />
        <button className="btn">Entrar </button>
      </form>
    </>
  );
}
