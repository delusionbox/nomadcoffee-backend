import { gql } from "apollo-server";

export default gql`
    type Category {
        id: Int!
        name: String!
        slug: String!
        shops: [CoffeeShop]
        totalShop: Int!
        createdAt: String!
        updatedAt: String!
    }

    type Query {
        seeCategories(lastId: Int!): [Category]
    }

`;