import { gql } from "apollo-server";

export default gql`
    type MutationResponse {
        ok: Boolean!
        error: String
    }
    type Mutation {
        createAccount(
            username: String!
            email: String!
            name: String!
            location: String
            password: String!
            avatarURL: String
            githubUsername: String
        ): MutationResponse!
    }
`;