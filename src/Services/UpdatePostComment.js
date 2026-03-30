import axios from "axios";

export async function updatePostComment(
  postId,
  commentId,
  commentContent,
  token,
) {
  try {
    const formData = new FormData();
    formData.append("content", commentContent);
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments/${commentId}`,
      formData,
      { headers: { Token: token } },
    );
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

// updatePostComment;
