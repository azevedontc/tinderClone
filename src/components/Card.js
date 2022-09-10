import React from "react";
import spacing from "../const/spacing";
import Paragraph from "./Paragraph";
import Title from "./Title";
import Link from "./Link";

function getDistanceFromLatLonInKm(position1, position2) {
  var deg2rad = function (deg) {
      return deg * (Math.PI / 180);
    },
    R = 6371,
    dLat = deg2rad(position2.lat - position1.lat),
    dLng = deg2rad(position2.lng - position1.lng),
    a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(position1.lat)) *
        Math.cos(deg2rad(position1.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2),
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return ((R * c * 1000) / 1000).toFixed();
}

export default function Card({ profile, variant = "normal", user }) {
  return (
    <Link to={`/profile/${profile.id}`}>
      <div
        className="card"
        style={{
          backgroundImage: `url("https://api.yuri.engineer/img/${profile.id}.jpeg")`,
          width: `${variant === "normal" ? "80vw" : "45vw"}`,
        }}
      >
        <div
          className="card-content"
          style={{
            padding: variant === "normal" ? spacing.medium : spacing.small,
          }}
        >
          <Title
            text={`${profile.name}, ${
              new Date().getFullYear() -
              new Date(profile.birth_date).getFullYear()
            }`}
            size={variant === "normal" ? "large" : "small"}
            color="secondary"
          />
          {variant === "normal" ? (
            <>
              <Paragraph style={{ marginTop: spacing.small, color: "white" }}>
                {profile.about}
              </Paragraph>
              <Paragraph style={{ marginTop: spacing.small, color: "white" }}>
                {getDistanceFromLatLonInKm(
                  { lat: user.geo.lat, lng: user.geo.lng },
                  { lat: profile.geo.lat, lng: profile.geo.lng }
                )}
                km de distancia
              </Paragraph>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Link>
  );
}
