import hubCommunityApi from "../api";

const EVENT_DOCUMENT_ID = process.env.NEXT_PUBLIC_EVENT_DOCUMENT_ID;

const list = (token) => {
  const params = {
    "populate[lead][fields][0]": "name",
    "populate[lead][fields][1]": "username",
    "populate[members][fields][0]": "name",
    "populate[members][fields][1]": "username",
    "pagination[pageSize]": 100,
  };

  if (EVENT_DOCUMENT_ID) {
    params["filters[event][documentId][$eq]"] = EVENT_DOCUMENT_ID;
  }

  return hubCommunityApi.get("/teams", {
    params,
    headers: { Authorization: `Bearer ${token}` },
  });
};

const get = (token, teamDocumentId) => {
  return hubCommunityApi.get(`/teams/${teamDocumentId}`, {
    params: {
      "populate": "presentation"
    },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const create = (token, { name, eventId }) => {
  const data = { name };
  if (eventId) {
    data.event = eventId;
  }
  return hubCommunityApi.post(
    "/teams",
    { data },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const changeLead = (token, teamDocumentId, newLeadId) => {
  return hubCommunityApi.put(
    `/teams/${teamDocumentId}/change-lead`,
    { newLeadId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const leave = (token, teamDocumentId) => {
  return hubCommunityApi.post(
    `/teams/${teamDocumentId}/leave`,
    {},
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const uploadPresentation = (token, teamDocumentId, file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("file", file, file.name);

  return hubCommunityApi.post(
    `/teams/${teamDocumentId}/presentation`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
      maxBodyLength: 150 * 1024 * 1024,
      maxContentLength: 150 * 1024 * 1024,
      timeout: 5 * 60 * 1000,
    }
  );
};

const team = { list, get, create, changeLead, leave, uploadPresentation };
export default team;
