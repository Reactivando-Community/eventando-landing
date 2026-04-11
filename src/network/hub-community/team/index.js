import hubCommunityApi from "../api";

const list = (token) => {
  return hubCommunityApi.get("/teams", {
    params: {
      "populate[lead][fields][0]": "name",
      "populate[lead][fields][1]": "username",
      "populate[members][fields][0]": "name",
      "populate[members][fields][1]": "username",
      "pagination[pageSize]": 100,
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const create = (token, { name }) => {
  return hubCommunityApi.post(
    "/teams",
    { data: { name } },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const get = (token, teamDocumentId) => {
  return hubCommunityApi.get(`/teams/${teamDocumentId}`, {
    params: {
      "populate[lead][fields][0]": "name",
      "populate[lead][fields][1]": "username",
      "populate[members][fields][0]": "name",
      "populate[members][fields][1]": "username",
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const changeLead = (token, teamDocumentId, newLeadId) => {
  return hubCommunityApi.put(
    `/teams/${teamDocumentId}/change-lead`,
    { newLeadId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const team = { list, get, create, changeLead };
export default team;
