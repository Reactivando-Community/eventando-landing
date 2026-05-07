import axios from "axios";

const hubCommunityApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_HUB_COMMUNITY_API_URL ||
    "https://manager.hubcommunity.io/api",
});

export default hubCommunityApi;
