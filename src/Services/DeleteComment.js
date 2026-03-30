import axios from "axios";

export async function deletePostComment(postId, commentId, token) {
  try {
    const { data } = await axios.delete(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
      { headers: { Token: token } },
    );
    return data;
  } catch (error) {
    throw error;
  }
}
