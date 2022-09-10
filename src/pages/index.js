import React, { useEffect, useContext, useState } from "react";
import {
  Avatar,
  Layout,
  Container,
  Paragraph,
  Card,
  CardAction,
  Link,
} from "../components";
import spacing from "../const/spacing";
import api from "../services/api";
import { AccountContext } from "../services/context";
import MatchImage from "../assets/images/itsamatch.png";

const WithoutUsersOnRange = () => {
  const { user } = useContext(AccountContext);
  return (
    <Container
      style={{ minHeight: "500px" }}
      justifyContent="center"
      alignItens="center"
    >
      <Avatar
        alt="Foto de perfil"
        img={`https://api.yuri.engineer/img/${user.id}.jpeg`}
        size="small"
      />
      <Container textAlign="center">
        <Paragraph style={{ margin: spacing.large }}>
          No momento não há pessoas <br />
          por perto...
        </Paragraph>
        <Link to={"/config"} variant="secondary">
          ir para as configurações
        </Link>
      </Container>
    </Container>
  );
};

const ItsAMatch = ({ ...props }) => {
  return (
    <Link to="/match">
      <div className="match-container">
        <img src={MatchImage} alt="" />
        <Avatar
          img="https://static-wp-tor15-prd.torcedores.com/wp-content/uploads/2022/07/luva-de-pedreiro-promete-surpresa-seguidores.png"
          alt="Seu match"
        />
        <strong>Luva de Pedreiro</strong>
        <p>Biografia da pessoa...</p>
      </div>
    </Link>
  );
};

export default function Main() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(AccountContext);

  useEffect(() => {
    async function getUsers() {
      const requestData = await api.get("/interactions", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });

      if (requestData.status === 200) {
        setUsers(requestData.data.data);
      }
    }
    getUsers();
  }, []);

  return (
    <Layout>
      {users.length > 0 ? (
        <>
          <Card profile={users[0]} user={user} />
          <CardAction profileId={users[0].id} />
        </>
      ) : (
        <WithoutUsersOnRange />
      )}
    </Layout>
  );
}
