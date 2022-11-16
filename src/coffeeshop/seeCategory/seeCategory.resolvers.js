import client from "../../client";

export default {
    Query: {
        seeCategory: (_, { categoryName, lastId }) =>
            client.category.findUnique({
                where: {
                    name: categoryName,
                },
            }).shops({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            }),
    },
};