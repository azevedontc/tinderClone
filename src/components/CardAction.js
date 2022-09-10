import React from "react";
import Like from "../assets/svgs/like.svg";
import Deslike from "../assets/svgs/dislike.svg";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CardAction({ profileId = 0 }) {
  const navigate = useNavigate();

  const handleInteraction = async (type) => {
    await api.post(`/interactions`, {
      target: profileId,
      like: type === "like",
    });
    navigate(0);
  };

  return (
    <div className="card-actions">
      <div>
        <button onClick={() => handleInteraction("deslike")}>
          <img src={Deslike} alt="deslike" />
        </button>
      </div>
      <div>
        <button onClick={() => handleInteraction("like")}>
          <img src={Like} alt="like" />
        </button>
      </div>
    </div>
  );
}
