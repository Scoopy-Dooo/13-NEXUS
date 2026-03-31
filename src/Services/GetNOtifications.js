import axios from "axios";

export async function GetNotes(token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/notifications`,
      {
        headers: {
          "Content-Type": "application/json",
          Token: token,
        },
      },
    );
    console.log("🚀 ~ GetNotes ~ data:", data)
    return await data;
  } catch (error) {
    throw new Error(error);
  }
}
