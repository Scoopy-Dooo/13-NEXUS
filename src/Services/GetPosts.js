import axios from "axios";

export default async function GetAllPosts(token) {
  try {
    const { data } = await axios(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: token,
      },
    });
    return await data;
  } catch (error) {
    console.log("error from get all post service : ", error);
    return null;
  }
}

// export async function GetMyPosts() {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/posts`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjliNDA4MWYwNTZiZGI3NjI3MGRkYjJhIiwiaWF0IjoxNzc0MzkzNTU2LCJleHAiOjE3NzQ5OTgzNTYsImF1ZCI6ImxpbmtlZC1wb3N0cy1jbGllbnQiLCJpc3MiOiJsaW5rZWQtcG9zdHMtYXBpIn0.hsVO3dzDkMtHADH-pacXkh7L0UAk0ImdqAu-gi7saPc`,
//       },
//     });
//     const data = await response.json();
//     console.log("data inside func : ", data);
//     return data;
//   } catch (error) {
//     console.log("error from get all post service : ", error);
//     return null;
//   }
// }
// GetMyPosts()