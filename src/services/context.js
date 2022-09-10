import React, { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../services/api";

const setGeolocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => { //pop-up de localização
      api.post("/user/geolocation", {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  } else {
    alert("Serviço de geolocalização não está disponível");
  }
};

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token] = useState(window.localStorage.getItem("token") || null);

  useEffect(() => {
    async function getUserInfos() {
      if (!token || !user?.name) {
        const { data: responseData } = await api.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(responseData.data);
        setGeolocation();
      }
    }
    getUserInfos();
  }, [token]);

  return (
    <AccountContext.Provider value={{ user, setUser }}>
      {children}
    </AccountContext.Provider>
  );
};
