import axios from "axios";

export default async function uploadProfileImg(file, token) {
  const formdata = new FormData();
  formdata.append("image", file);
  const { data } = await axios(
    `${import.meta.env.VITE_API_BASE_URL}/users/profile-image`,
    {
      headers: { Token: token },
      method: "PUT",
      data: formdata,
    },
  );
  return data;
}
