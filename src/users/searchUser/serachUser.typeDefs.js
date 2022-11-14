import { gql } from "apollo-server-express";

export default gql`
    type SearchUserResult {
        ok: Boolean!
        error: String
        users: [User]
    }
    type Query{
        searchUser(keyword: String!, lastId: Int): SearchUserResult
    }
`;