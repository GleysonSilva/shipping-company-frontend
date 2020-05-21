import React from "react";
import api from "../../services/api";
import Paper from "@material-ui/core/Paper";
import "./style.css";

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
    <div className="root">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Login</label>
        <input
          type="email"
          id="email"
          placeholder="Seu melhor email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <button className="btn" onClick={() => history.push("/dashboard")}>
          Entrar{" "}
        </button>
      </form>
    </div>
  );
}
