import client from "../../client";

export default {
    Query: {
        searchUser: async (_, { keyword, lastId }) => {
            const users = await client.user.findMany({
                where: {
                    username: {
                        startsWith: keyword.toLowerCase(),
                    }
                },
                //cursor pagination
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            });
            return {
                ok: true,
                users,
            }
        },
    },
};