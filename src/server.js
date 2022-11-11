require("dotenv").config();
import express from "express";
import logger from "morgan";
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectResolver } from "./users/users.utils";




const apollo = new ApolloServer({
    resolvers,
    typeDefs,

    context: async ({ req }) => {
        return {
            loggedInUser: await getUser(req.headers.token),
            protectResolver,
        };
    },
});

const app = express();
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({ app });
const PORT = process.env.PORT;
app.listen({ port: PORT }, () => {
    console.log(`server is running => localhost:${PORT}`);
});