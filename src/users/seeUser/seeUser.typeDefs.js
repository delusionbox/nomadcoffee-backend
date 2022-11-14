import { gql } from "apollo-server-express";

export default gql`
    type SeeUserQuery {
        ok: Boolean!
        error: String
        followers: [User]
        following: [User]
        totalPages: Int
    }

    type Query{
        seeFollowers(username:String!, page:Int!): SeeUserQuery!
        seeFollowing(username:String!, lastId:Int): SeeUserQuery!
    }
`;