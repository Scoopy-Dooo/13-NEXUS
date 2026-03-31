import axios from "axios";

export default async function putLikeApi(postId, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/like`,
      {
        headers: {
          Token: token,
        },
        method: "PUT",
        redirect: "follow",
      },
    );
    return await data;
  } catch (error) {
    // console.log("🚀 ~ putLikeApi from func  ~ error:", error);
    return null;
  }
}
