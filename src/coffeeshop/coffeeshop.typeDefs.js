import { gql } from "apollo-server";

export default gql`
    type CoffeeShop {
        id: Int!
        name: String!      
        latitude: String!   
        longtitude: String!
        user: User!    
        photos: [CoffeeShopPhoto]
        categories: [Category]
        createdAt: String!
        updatedAt: String!    
    }
    type CoffeeShopPhoto{
        id: Int!         
        url: String!
        shop: CoffeeShop!
        createdAt: String!  
        updatedAt: String!
    }
    type Category{
        id: Int!
        name: String!
        slug: String!
        Category: String!
        caption: String
        shops: [CoffeeShop]
        totalShop: Int!
        createdAt: String!
        updatedAt: String!
    }
`;