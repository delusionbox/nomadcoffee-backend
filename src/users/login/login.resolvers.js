import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
    Mutation: {
        login: async (_, { username, password }) => {
            //find user with args username
            const user = await client.user.findFirst({
                where: {
                    username
                }
            })
            if (!user) {
                return {
                    ok: false,
                    error: "User not Found"
                };
            }
            //check password wtih args password
            const passwordOk = await bcrypt.compare(password, user.password);
            if (!passwordOk) {
                return {
                    ok: false,
                    error: "Incorrect Password",
                };
            }
            //make token use jwt
            const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
            return {
                ok: true,
                token,
            }
        },
    },
};