import axios from "axios";

export async function deletePost(postId, token) {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
      { headers: { Token: token } },
    );


    console.log("🚀 ~ deletePost ~ data:", data);

    return await data;
  } catch (error) {
    console.log("🚀 ~ deletePost ~ error:", error);
    return null;
  }
}
