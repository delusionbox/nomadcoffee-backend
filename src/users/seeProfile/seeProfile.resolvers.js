import client from "../../client"

export default {
    Query: {
        seeProfile: (_, { username }) =>
            client.user.findUnique({
                where: {
                    username,
                },
                //want user relation get //4.22
                include: {
                    following: true,
                    followers: true,
                }
            }),
    }
};