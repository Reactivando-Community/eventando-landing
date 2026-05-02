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
      "populate[team][fields][0]": "name",
      "populate[team][fields][1]": "documentId",
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const checkEventAccess = async (token, email) => {
  const eventDocId = process.env.NEXT_PUBLIC_EVENT_DOCUMENT_ID;
  if (!eventDocId) return true;

  try {
    const res = await hubCommunityApi.get("/participants", {
      params: {
        "filters[email][$eq]": email,
        "populate": "event",
        "pagination[pageSize]": 100,
      },
      headers: { Authorization: `Bearer ${token}` },
    });
    const participants = res.data?.data || [];
    return participants.some(
      (p) => p.event?.documentId === eventDocId || String(p.event?.id) === eventDocId
    );
  } catch {
    return false;
  }
};

const auth = { signIn, signUp, getMe, checkEventAccess };
export default auth;
