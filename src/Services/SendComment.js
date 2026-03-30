import axios from "axios";

export async function SendComment(postId, commentContent, token) {
    try {
      const formData = new FormData();
      formData.append("content", commentContent);

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`,
      formData,
      { headers: { Token: token } },
    );
    return data;
  } catch (error) {
    throw new Error(error); // Rethrow the error;
  }
}