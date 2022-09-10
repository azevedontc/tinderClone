import React, { useContext } from "react";
import { Layout, Title, Input, Button, Link } from "../components";
import useForm from "../hooks/useForm";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AccountContext } from "../services/context";

export default function LoginPage() {
  const history = useNavigate();
  const { setUser } = useContext(AccountContext);
  const [{ values }, handleChange, handleSubmit] = useForm();

  const handleLogin = async () => {
    try {
      const request = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      if (request.data.data.token) {
        const { data: responseData } = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${request.data.data.token}`,
          },
        });

        if (responseData.data) {
          setUser(responseData.data);
          window.localStorage.setItem("token", request.data.data.token);
          history("/");
        }
      }
    } catch (error) {
      console.log("err", error);
      alert("Erro ao realizar o login. Tente novamente mais tarde!");
    }
  };

  return (
    <Layout>
      <Title text="Realize o login" size="medium" />
      <Title text="ou crie uma nova conta" size="small" />
      <form onSubmit={handleSubmit(handleLogin)}>
        <Input
          label="Email"
          type="email"
          name="email"
          required
          onChange={handleChange}
        />
        <Input
          label="Senha"
          type="password"
          name="password"
          required
          onChange={handleChange}
        />
        <Button text="Entrar" type="submit" />
        <Link to="/signup" variant="secondary">
          criar uma nova conta
        </Link>
      </form>
    </Layout>
  );
}
