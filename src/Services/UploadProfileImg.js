import axios from "axios";

export default async function uploadProfileImg(file, token) {
  const formdata = new FormData();
  formdata.append("photo", file, "file");
  const { data } = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/users/upload-photo`,
      formdata,
    { headers: { Token: token } },
  );
  return data;
}
