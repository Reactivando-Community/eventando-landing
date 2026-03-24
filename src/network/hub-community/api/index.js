import axios from "axios";

const hubCommunityApi = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_HUB_COMMUNITY_API_URL ||
    "https://hubcommunity-manager.8020digital.com.br/api",
});

export default hubCommunityApi;
