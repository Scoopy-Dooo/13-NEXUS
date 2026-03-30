import axios from "axios";

export async function GetNotes(token) {
  try {
    const { data } = await axios(
      `${import.meta.env.VITE_API_BASE_URL}/notifications`,
      {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      },
    );
    return await data;
  } catch (error) {
    throw new Error(error);
  }
}