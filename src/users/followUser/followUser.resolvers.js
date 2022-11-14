import client from "../../client";
import { protectResolver } from "../users.utils";

export default {
    Mutation: {
        followUser: protectResolver(async (_, { username }, { loggedInUser }) => {
            const ok = await client.user.findUnique({ where: { username } });
            if (!ok) {
                return {
                    ok: false,
                    error: "User not exist"
                };
            }
            await client.user.update({
                where: {
                    id: loggedInUser.id,
                },
                data: {
                    following: {
                        connect: {
                            username,
                        }
                    }
                },
            });
            return {
                ok: true,
            }
        }),
    }
}