import { gql } from "apollo-server-express";

export const typeDefs = gql`
   type Query {
       message : String
       user:[User]
   }
   type User {
       id : ID!
       name : String!
   }
   type Mutation{
       CreateUser(name:String): User!
   }
`;


