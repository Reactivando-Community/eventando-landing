import hubCommunityApi from "../api";

const upload = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("files", file, file.name);
  return hubCommunityApi.post("/upload", formData, {
    onUploadProgress,
    maxBodyLength: 150 * 1024 * 1024,
    maxContentLength: 150 * 1024 * 1024,
    timeout: 5 * 60 * 1000,
  });
};

const create = (data) => {
  return hubCommunityApi.post("/sw-forms", { data });
};

const getAll = (params) => {
  return hubCommunityApi.get("/sw-forms", { params });
};

const getById = (id, params) => {
  return hubCommunityApi.get(`/sw-forms/${id}`, { params });
};

const swForm = { upload, create, getAll, getById };
export default swForm;
