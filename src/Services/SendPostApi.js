import axios from "axios";

export default async function sendPost(data, token) {
  const formdata = new FormData();
  if (data.text) formdata.append("body", data.text);
  if (data.image) formdata.append("image", data.image);

  try {
    const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
      headers: { Token: token },
      method: "POST",
      data: formdata,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
