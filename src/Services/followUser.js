import axios from "axios";

export async function followUserApi(userId, token) {
  try {
    const data = await axios.put(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/follow`,
      {},{
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      },
    );
    console.log("🚀 ~ followUser ~ data:", data);
    return data?.data;
  } catch (error) {
    throw new Error(error);
  }
}
