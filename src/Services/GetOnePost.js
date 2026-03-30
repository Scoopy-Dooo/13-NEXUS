import axios from "axios";

export async function getOnePost(postId, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
      {
        headers: {
          Token: token,
        },
      },
    );

    return await data?.data?.post;
  } catch (error) {
    console.log("🚀 ~ getOnePost ~ error:", error);
    return null;
  }
}
