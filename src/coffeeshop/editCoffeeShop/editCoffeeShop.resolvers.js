import client from "../../client";
import { protectResolver } from "../../users/users.utils";

export default {
    Mutation: {
        editCoffeeShop: protectResolver(
            async (_, { id, name, categories, photos }, { loggedInUser }) => {
                let shopURL = null
                if (photos) {
                    const { filename, createReadStream } = await photos;
                    const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}-coffee`;
                    const readStream = createReadStream();
                    const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);

                    readStream.pipe(writeStream);
                    shopURL = `http://localhost:4000/static/${newFilename}`;
                }

                const oldShop = await client.coffeeShop.findFirst({
                    where: {
                        id,
                        userId: loggedInUser.id,
                    },
                    include: {
                        categories: {
                            select: {
                                category: true,
                            },
                        },
                        name,
                        categories,
                    },
                });
                if (!oldShop) {
                    return {
                        ok: false,
                        error: "Shop not found",
                    };
                }
                const photo = await client.coffeeShopPhoto.update({
                    where: {
                        id,
                    },
                    data: {
                        url: shopURL,
                        shop: {
                            disconnect: {
                                id: createShop.id,
                            },
                        },
                    }
                });
                return {
                    ok: true,
                    shop: oldShop,
                    photos: photo,
                }
            }
        )
    }
}