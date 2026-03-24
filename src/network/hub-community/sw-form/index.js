import hubCommunityApi from "../api";

const upload = (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append("files", file, file.name);
  return hubCommunityApi.post("/upload", formData, { onUploadProgress });
};

const create = (data) => {
  return hubCommunityApi.post("/sw-forms", { data });
};

const swForm = { upload, create };
export default swForm;
