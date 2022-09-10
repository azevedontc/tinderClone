import React, { useState } from "react";
import { Layout, Title, Button, Input, Textarea, Select } from "../components";
import { useNavigate } from "react-router-dom";
import useForm from "../hooks/useForm";
import api from "../services/api";
import spacing from "../const/spacing";

export default function Index() {
  const history = useNavigate();
  const [file, setFile] = useState();
  const [{ values }, handleChange, handleSubmit] = useForm();

  const handleSignup = async () => {
    try {
      await api.post(
        "/user",
        {
          name: values.name,
          email: values.email,
          birth_date: new Date(values.birth_date),
          password: values.password,
          sex: values.sex,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
          },
        }
      );

      const { data: userLogin } = await api.post("/login", {
        email: values.email,
        password: values.password,
      });

      await api.post(
        "/user/customize",
        {
          distance: 10,
          instagram: values.instagram,
          about: values.about,
          sex_preference: values.sex_preference,
        },
        {
          headers: {
            Authorization: `Bearer ${userLogin.data.token}`,
          },
        }
      );

      const formData = new FormData();
      formData.append("image", file);

      await api({
        method: "post",
        data: formData,
        url: "/user/image",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${userLogin.data.token}`,
        },
      });

      window.localStorage.setItem("token", userLogin.data.token);
      history("/");
    } catch (error) {
      console.log(error);
      alert("Erro na criação de usuário. Revise os dados e tente novamente!");
    }
  };

  const handleChangeFile = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit(handleSignup)}>
        <Title text="Seja bem vindo(a), " size="medium" />
        <Title
          text="crie agora sua conta"
          size="small"
          style={{ marginBottom: spacing.medium }}
        />
        <input
          type="file"
          name="file"
          accept=".jpeg"
          onChange={handleChangeFile}
        />
        <Input label="Nome" type="text" name="name" onChange={handleChange} />
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
        <Input
          label="Data de nascimento"
          type="date"
          name="birth_date"
          required
          onChange={handleChange}
        />
        <Input
          label="Instagram"
          type="text"
          name="instagram"
          required
          onChange={handleChange}
        />
        <Textarea
          label="Sobre você"
          rows="6"
          name="about"
          required
          onChange={handleChange}
        />
        <Select
          label="Sexo"
          name="sex"
          required
          onChange={handleChange}
          options={[
            { label: "Mulher", value: "FEMALE" },
            { label: "Homem", value: "MALE" },
          ]}
        />
        <Select
          label="Preferência"
          name="sex_preference"
          required
          onChange={handleChange}
          options={[
            { label: "Mulheres", value: "FEMALE" },
            { label: "Homens", value: "MALE" },
            { label: "Outros", value: "ALL" },
          ]}
        />
        <Button text="Criar conta" />
      </form>
    </Layout>
  );
}
