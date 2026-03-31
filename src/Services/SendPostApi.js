import axios from "axios";

export default async function sendPost(data, token) {
  const formdata = new FormData();
  if (data.text) formdata.append("body", data.text);
  if (data.image) formdata.append("image", data.image);

  try {
    const {data} = await axios(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
      headers: { Token: token },
      method: "POST",
      data: formdata,
    });
    console.log("🚀 ~ sendPost ~ data:", data)
    return data;
  } catch (error) {
    throw new  Error(error);
  }
}
