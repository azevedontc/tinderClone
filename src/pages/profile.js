import React, { useEffect, useState } from "react";
import { Layout, Title, Paragraph, Button, Divider } from "../components";
import spacing from "../const/spacing";
import api from "../services/api";
import { useParams } from "react-router-dom";

export default function ProfilePage() {
  const params = useParams();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    async function getUserProfileInfo() {
      const { data: userRequest } = await api.get(`/user/${params.id}`, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      });
      setProfile(userRequest.data);
    }
    getUserProfileInfo();
  }, [params.id]);

  return (
    <Layout>
      <div className="profile-view">
        <div
          className="profile-view-image"
          style={{
            backgroundImage: `url("http://147.182.143.140:4444/img/${profile.id}.jpeg")`,
          }}
        ></div>
      </div>

      <div className="profile-view-content">
        <Title
          text={`${profile.name}, ${
            new Date().getFullYear() -
            new Date(profile.birth_date).getFullYear()
          }`}
          size="large"
        />
        <Divider />
        <Title text="Sobre" size="medium" />
        <Paragraph style={{ marginTop: spacing.small, width: "100%" }}>
          {profile.about}
        </Paragraph>
      </div>
      <div className="profile-view-action">
        <a
          href={`https://instagram.com/${profile.instagram}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button text="Instagram" />
        </a>
      </div>
    </Layout>
  );
}
