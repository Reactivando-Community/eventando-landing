"use client";

import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import hubCommunity from "@/network/hub-community";

const AuthContext = createContext(null);

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

function authReducer(state, action) {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, isLoading: true };
    case "AUTH_SUCCESS":
      return {
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      };
    case "AUTH_ERROR":
      return { ...initialState, isLoading: false };
    case "SIGN_OUT":
      return { ...initialState, isLoading: false };
    case "UPDATE_USER":
      return { ...state, user: action.payload.user };
    case "LOADED":
      return { ...state, isLoading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const refreshUser = useCallback(async (token) => {
    const jwt = token || state.token;
    if (!jwt) return;
    try {
      const res = await hubCommunity.auth.getMe(jwt);
      dispatch({ type: "UPDATE_USER", payload: { user: res.data } });
    } catch {
      // token might be expired
      dispatch({ type: "SIGN_OUT" });
      localStorage.removeItem("auth_token");
    }
  }, [state.token]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token");
    if (!storedToken) {
      dispatch({ type: "LOADED" });
      return;
    }

    hubCommunity.auth
      .getMe(storedToken)
      .then((res) => {
        dispatch({
          type: "AUTH_SUCCESS",
          payload: { user: res.data, token: storedToken },
        });
      })
      .catch(() => {
        localStorage.removeItem("auth_token");
        dispatch({ type: "AUTH_ERROR" });
      });
  }, []);

  const signIn = async (identifier, password) => {
    dispatch({ type: "AUTH_START" });
    try {
      const res = await hubCommunity.auth.signIn(identifier, password);
      const { jwt } = res.data;
      localStorage.setItem("auth_token", jwt);

      const meRes = await hubCommunity.auth.getMe(jwt);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: meRes.data, token: jwt },
      });
      return { success: true };
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" });
      const message =
        err.response?.data?.error?.message || "Erro ao fazer login.";
      return { success: false, error: message };
    }
  };

  const signUp = async ({ username, email, password, name, phone }) => {
    dispatch({ type: "AUTH_START" });
    try {
      const res = await hubCommunity.auth.signUp({
        username,
        email,
        password,
        name,
        phone,
      });
      const { jwt } = res.data;
      localStorage.setItem("auth_token", jwt);

      const meRes = await hubCommunity.auth.getMe(jwt);
      dispatch({
        type: "AUTH_SUCCESS",
        payload: { user: meRes.data, token: jwt },
      });
      return { success: true };
    } catch (err) {
      dispatch({ type: "AUTH_ERROR" });
      const message =
        err.response?.data?.error?.message || "Erro ao criar conta.";
      return { success: false, error: message };
    }
  };

  const signOut = () => {
    localStorage.removeItem("auth_token");
    dispatch({ type: "SIGN_OUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
