import hubCommunityApi from "../api";

const signIn = (identifier, password) => {
  return hubCommunityApi.post("/auth/local", { identifier, password });
};

const signUp = ({ username, email, password, name, phone }) => {
  return hubCommunityApi.post("/auth/local/register", {
    username,
    email,
    password,
    name,
    phone,
  });
};

const getMe = (token) => {
  return hubCommunityApi.get("/users/me", {
    params: {
      "populate[team][populate][members][fields][0]": "name",
      "populate[team][populate][members][fields][1]": "username",
      "populate[team][populate][lead][fields][0]": "name",
      "populate[team][populate][lead][fields][1]": "username",
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const auth = { signIn, signUp, getMe };
export default auth;
