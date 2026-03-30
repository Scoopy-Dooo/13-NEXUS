import axios from "axios";

export async function likePostComment(postId, commentId, token) {
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments/${commentId}/like`,
      {},
      { headers: { Token: token } },
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
}
