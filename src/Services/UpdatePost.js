import axios from "axios";

export async function updatePost(postId, body, token) {
  const formData = new FormData();
  if (body.text) formData.append("body", body.text);
  if (body.image) formData.append("image", body.image);

  const { data } = await axios.put(
    `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
    formData,
    { headers: { Token: token } },
  );
  return data;
}
