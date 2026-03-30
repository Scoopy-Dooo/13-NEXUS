import axios from "axios";

export async function getPostLikes(postId, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/likes?page=1&limit=40`,
      {
        headers: {
          Token: token,
        },
        method: "GET",
        redirect: "follow",
      },
    );
    return await data?.data?.likes;
  } catch (error) {
    console.log("🚀 ~ getPostLikes ~ error:", error);
    return null;
  }
}
