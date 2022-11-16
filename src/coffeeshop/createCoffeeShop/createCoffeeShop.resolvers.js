import client from "../../client";
import { protectResolver } from "../../users/users.utils";
import { processCategories } from "../coffeeshop.utils";

export default {
    Mutation: {
        createCoffeeShop: protectResolver(async (_, { name, latitude, longtitude, photos, caption }, { loggedInUser }) => {

            let shopURL = null
            if (photos) {
                const { filename, createReadStream } = await photos;
                const newFilename = `${loggedInUser.id}-${Date.now()}-${filename}-coffee`;
                const readStream = createReadStream();
                const writeStream = createWriteStream(process.cwd() + "/uploads/" + newFilename);

                readStream.pipe(writeStream);
                shopURL = `http://localhost:4000/static/${newFilename}`;
            }

            /*
            let categoriesObjs = categories;
            if (slug) {
                const categories = slug.match(/#[\w]+/g);
                categoriesObjs = categories.map((slug) => ({
                    where: {
                        slug,
                    },
                    create: {
                        slug,
                    },
                }));
            };
            */
            let categoryObjs = [];
            if (caption) {
                categoryObjs = processCategories(caption);
                console.log(categoryObjs);
            }

            const createShop = await client.coffeeShop.create({
                data: {
                    name,
                    latitude,
                    longtitude,
                    user: {
                        connect: {
                            id: loggedInUser.id,
                        },
                    },
                    ...(categoryObjs.length > 0 && {
                        categories: {
                            connectOrCreate: categoryObjs,
                        },
                    }),
                    caption,
                },
            });
            let coffeeShopPhotos = [];
            const coffeeShopPhoto = await client.coffeeShopPhoto.create({
                data: {
                    url: shopURL,
                    shop: {
                        connect: {
                            id: createShop.id,
                        },
                    },
                },
            });
            coffeeShopPhotos.push(coffeeShopPhoto);
            return {
                ok: true,
                shop: createShop,
                photos: coffeeShopPhoto,
            }
        }),
    },
};