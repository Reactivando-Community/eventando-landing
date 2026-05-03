import hubCommunityApi from "../api";

const EVENT_DOCUMENT_ID = process.env.NEXT_PUBLIC_EVENT_DOCUMENT_ID;

const create = (data) => {
  const payload = { ...data };
  if (EVENT_DOCUMENT_ID) {
    payload.event = EVENT_DOCUMENT_ID;
  }
  return hubCommunityApi.post("/event-feedbacks", { data: payload });
};

const getAll = (token, params = {}) => {
  const baseParams = {
    "pagination[pageSize]": 500,
    "sort[0]": "createdAt:desc",
    populate: "meals",
  };
  if (EVENT_DOCUMENT_ID) {
    baseParams["filters[event][documentId][$eq]"] = EVENT_DOCUMENT_ID;
  }
  return hubCommunityApi.get("/event-feedbacks", {
    params: { ...baseParams, ...params },
    headers: { Authorization: `Bearer ${token}` },
  });
};

const eventFeedback = { create, getAll };
export default eventFeedback;
