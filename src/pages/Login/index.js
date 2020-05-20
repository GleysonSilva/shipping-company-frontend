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
  return <>TESTE</>;
}
