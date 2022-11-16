export const processCategories = (caption) => {
    const categories = caption.match(/#[\w]+/g) || [];
    return categories.map((category) => ({
        where: { category },
        create: { category },
    }));
};