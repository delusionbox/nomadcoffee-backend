import client from "../../client";

export default {
    Query: {
        seeCategories: (_, { lastId }) =>
            client.category.findMany({
                take: 5,
                skip: lastId ? 1 : 0,
                ...(lastId && { cursor: { id: lastId } }),
            }),
    },
    Category: {
        totalShop: ({ name }) =>
            client.coffeeShop.count({
                where: {
                    categories: {
                        some: {
                            name,
                        },
                    },
                },
            }),
    },
};