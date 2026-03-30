import axios from "axios";

export async function changePass(body, token) {
  const { data } = await axios.patch(
    `${import.meta.env.VITE_API_BASE_URL}/users/change-password`,
    body,
    { headers: { Token: token } },
  );
  return data;
}
