import React from "react";
import { useState, useContext } from "react";
import {
  Layout,
  Avatar,
  Divider,
  Button,
  Title,
  Paragraph,
  Range,
  Input,
  Textarea,
  Select,
} from "../components";
import spacing from "../const/spacing";
import api from "../services/api";
import { AccountContext } from "../services/context";
import useForm from "../hooks/useForm";

export default function ConfigPage() {
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { user, setUser } = useContext(AccountContext);
  const [{ values }, handleChange, handleSubmit] = useForm();

  const preferencesDefinition = {
    FEMALE: "Mulheres",
    MALE: "Homens",
    ALL: "Todos",
  };

  const handleSetRange = async (value) => {
    await api.post(
      "/user/customize",
      { ...user, distance: value },
      {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      }
    );
    setUser({ ...user, distance: value });
  };

  const handleUpdateUser = async () => {
    try {
      setSubmitting(true);
      await api.post(
        "/user/customize",
        { ...user, ...values },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      );
      setUser({ ...user, ...values });
      setEditMode(!editMode);
      setSubmitting(false);
    } catch (error) {
      alert("Erro na alteração dos dados");
    }
  };

  return (
    <Layout>
      <Avatar
        alt="Foto de perfil"
        img={`http://147.182.143.140:4444/img/${user.id}.jpeg`}
        size="small"
      />
      <Title
        text={user.name}
        size="large"
        style={{ margin: `${spacing.medium}` }}
      />
      <Divider />
      {!editMode ? (
        <>
          <div style={{ width: "100%" }}>
            <Title
              text="Sobre"
              size="medium"
              style={{ margin: `${spacing.medium} 0px` }}
            />
            <Paragraph>{user.about}</Paragraph>
            <Title
              text="Idade"
              size="medium"
              style={{ margin: `${spacing.medium} 0px` }}
            />
            <Paragraph>
              {new Date().getFullYear() -
                new Date(user.birth_date).getFullYear()}{" "}
              anos
            </Paragraph>
            <Title
              text="Instagram"
              size="medium"
              style={{ margin: `${spacing.medium} 0px` }}
            />
            <Paragraph>@{user.instagram}</Paragraph>
            <Title
              text="Preferência"
              size="medium"
              style={{ margin: `${spacing.medium} 0px` }}
            />
            <Paragraph>{preferencesDefinition[user.sex_preference]}</Paragraph>
          </div>
          <Divider />
          <Title text="Buscar pessoas até" />
          <Range onChange={handleSetRange} defaultValue={user.distance} />
          <Button text="Editar perfil" onClick={() => setEditMode(!editMode)} />
        </>
      ) : (
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <Textarea
            label="Sobre você"
            rows="6"
            name="about"
            defaultValue={user.about}
            onChange={handleChange}
          ></Textarea>
          <Input
            label="Instagram"
            type="text"
            name="instagram"
            defaultValue={user.instagram}
            onChange={handleChange}
          />
          <Select
            label="Preferência"
            name="sex_preference"
            defaultValue={user.sex_preference}
            onChange={handleChange}
            options={[
              { label: "Mulheres", value: "FEMALE" },
              { label: "Homens", value: "MALE" },
              { label: "Outros", value: "ALL" },
            ]}
          />
          <Button
            text="Salvar alterações"
            type="submit"
            disabled={submitting}
          />
        </form>
      )}
    </Layout>
  );
}
