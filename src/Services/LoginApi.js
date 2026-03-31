import axios from "axios";

export async function loginApi(loginData) {
  const { data } = await axios.post(
    `${import.meta.env.VITE_API_BASE_URL}/users/signin`,
    loginData,
    { headers: { "Content-Type": "application/json" } },
  );
  return data;
}
