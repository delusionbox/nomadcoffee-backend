import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        username: String!
        email: String!
        name: String!
        location: String
        avatarURL: String
        githubUsername: String
        createdAt: String!
        updatedAt: String!
        following: [User]
        followers: [User]
        totalFollowing: Int!
        totalFollowers: Int!
        isMe: Boolean!
        isFollowing: Boolean!
    }
    type MutationResponse {
        ok: Boolean!
        error: String
    }
`;