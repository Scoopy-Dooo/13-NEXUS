import axios from "axios";
import { toast } from "react-toastify";

export default async function putLikeApi(postId, token) {
  const notify = (massage) => toast(massage);

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

    console.log("🚀 ~ putLikeApi from func ~ data:", data);
    const myMassage = data?.data?.liked
      ? "liked successfully"
      : "unliked successfully";
    notify(myMassage);
    return await data;
  } catch (error) {
    console.log("🚀 ~ putLikeApi from func  ~ error:", error);
    return null;
  }
}
