import { gql } from "apollo-server";

export default gql`
    type EditCoffeeResult {
        ok: Boolean!
        error: String
        shop: CoffeeShop
        photos: [CoffeeShopPhoto]
    }

    type Mutation {
        editCoffeeShop(id: Int! name: String latitude: String longtitude: String photos: [Upload] categories: [String]): EditCoffeeResult
    }
`;