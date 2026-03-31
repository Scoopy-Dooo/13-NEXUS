import axios from "axios";

export async function BookmarkPost(postId, token) {
    try {
        const { data } = await axios(
            `${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/bookmark`,
            {
                headers: {
                    Token: token,
                },
                method: "PUT",
                redirect: "follow",
            },
        );

        return await data?.data;
    } catch (error) {
        // console.log("🚀 ~ BookmarkPost ~ error:", error);
        return null;
    }
}