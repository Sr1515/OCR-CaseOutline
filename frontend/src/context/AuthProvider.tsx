import React, { createContext, useEffect, useState } from "react";
import { api } from "../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  exp: number;
  iat: number;
}

interface IContext {
  tokenState: string | null;
  userId: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext({} as IContext);

interface IProps {
  children: React.ReactNode;
}

export function AuthProviderContext({ children }: IProps) {
  const [tokenState, setTokenState] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();

  async function login(email: string, password: string): Promise<void> {
    try {
      const response = await api.post("/auth/signin", { email, password });
      const access = response.data.accessToken;

      localStorage.setItem("token", access);
      axios.defaults.headers.common.Authorization = `Bearer ${access}`;
      setTokenState(access);

      const decoded = jwtDecode<JwtPayload>(access);
      setUserId(decoded.sub);
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
  }

  async function logout() {
    setTokenState(null);
    setUserId(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common.Authorization;
    navigate("/", { replace: true });
  }

  useEffect(() => {
    const tokenStorage = localStorage.getItem("token");

    if (tokenStorage) {
      try {
        const decoded = jwtDecode<JwtPayload>(tokenStorage);

        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) throw new Error("Token expirado");

        setTokenState(tokenStorage);
        setUserId(decoded.sub);
        axios.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
      } catch (err) {
        console.error("Token inválido:", err);
        logout();
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ tokenState, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
