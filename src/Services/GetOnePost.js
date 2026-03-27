import axios from "axios";

export async function getOnePost(postId, token) {
  try {
    const {data} = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`,
      {
        headers: {
          Token: token,
        },
      },
    );

    console.log("data from one  post func : ", data);
    return await data?.data?.post;
  } catch (error) {
    console.log("error from post details : ", error);
    return null;
  }
}
