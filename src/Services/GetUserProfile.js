import axios from "axios";

export async function getMyProfileApi(token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/users/profile-data`,
      {
        headers: {
          Token: token,
        },
        method: "GET",
        redirect: "follow",
      },
    );

    return await data?.data?.user;
  } catch (error) {
    console.log("🚀 ~ getMyProfileApi ~ error:", error);
    return null;
  }
}
export async function getProfileApi(userId, token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/users/${userId}/profile`,
      {
        headers: {
          Token: token,
        },
        method: "GET",
        redirect: "follow",
      },
    );

    return await data?.data;
  } catch (error) {
    console.log("🚀 ~ getProfileApi ~ error:", error);
    return null;
  }
}
