import axios from "axios";
export async function getUserPosts(userId, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/posts`,
      {
        headers: {
          Token: token,
        },
        method: "GET",
      },
    );
    return data?.data?.posts;
  } catch (error) {
    console.log("🚀 ~ getUserPosts ~ error:", error);
    return null;
  }
}