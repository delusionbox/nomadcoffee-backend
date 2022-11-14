import client from "../../client"

export default {
    Query: {
        //offset Pagination
        seeFollowers: async (_, { username, page }) => {
            //use select, 
            const ok = await client.user.findUnique({
                where: {
                    username,
                },
                select: {
                    id: true,
                }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Not found User",
                }
            };
            const followers = await client.user
                .findUnique({ where: { username } })
                .followers({
                    take: 5,
                    skip: (page - 1) * 5,
                });
            //use count 
            const totalFollowers = await client.user.count({
                where: { following: { some: { username } } },
            });
            return {
                ok: true,
                followers,
                totalPages: Math.ceil(totalFollowers / 5),
            }
        },
        //cursor based Pagination
        seeFollowing: async (_, { username, lastId }) => {
            //use select, 
            const ok = await client.user.findUnique({
                where: {
                    username,
                },
                select: {
                    id: true,
                }
            });
            if (!ok) {
                return {
                    ok: false,
                    error: "Not found User",
                }
            };
            const following = await client.user
                .findUnique({ where: { username } })
                .following({
                    take: 5,
                    skip: lastId ? 1 : 0,
                    ...(lastId && { cursor: { id: lastId } }),
                });
            return {
                ok: true,
                following,
            }
        },
    },
    // follower & following Computed Fields
    User: {
        totalFollowing: ({ id }) => client.user.count({
            where: {
                followers: {
                    some: {
                        id,
                    },
                },
            },
        }),
        totalFollowers: ({ id }) => client.user.count({
            where: {
                following: {
                    some: {
                        id,
                    },
                },
            },
        }),
    }
};