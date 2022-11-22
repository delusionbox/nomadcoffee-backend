import bcrypt from "bcrypt";
import client from "../../client";

export default {
    Mutation: {
        createAccount: async (_, {
            username, email, name, location, password, avatarURL, githubUsername
        }) => {
            //try {
            //username or email check
            const existUser = await client.user.findFirst({
                where: {
                    OR: [{
                        username,
                    },
                    {
                        email,
                    },
                    ],
                },
            });
            if (existUser) {
                return {
                    ok: false,
                    error: "Check that the username / email aren't taken.",
                };
            }
            //password hashing
            const uglyPassword = await bcrypt.hash(password, 10);
            //user create
            await client.user.create({
                data: {
                    username,
                    email,
                    name,
                    location,
                    avatarURL,
                    githubUsername,
                    password: uglyPassword,
                },
            });
            //ok or error
            return {
                ok: true,
            }
            /* 
        } catch ($error) {
            return {
                ok: false,
                error: $error
            }
        }
        */
        },
    },
};