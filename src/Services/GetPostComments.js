import axios from "axios";

export async function getPostComments(post, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${post}/comments?page=1&limit=40`,
      {
        headers: {
          Token: token,
        },
        redirect: "follow",
      },
    );
    return data?.data?.comments;
  } catch (error) {
    throw new Error(error);
  }
}
