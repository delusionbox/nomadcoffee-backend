import { gql } from "apollo-server";

export default gql`
    type CoffeeShopResponse {
        ok:Boolean!
        error: String
        shop: CoffeeShop
        photos: [CoffeeShopPhoto]
    }
    type Mutation{
        createCoffeeShop( 
            name:String! 
            latitude:String 
            longtitude:String 
            photos: [Upload]
            categories: [String]
            slug: String
            caption: String!
        ): CoffeeShopResponse
    }
`;