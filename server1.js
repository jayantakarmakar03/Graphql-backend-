const express = require('express');
const { graphqlHTTP } = require('express-graphql');
var {buildSchema } = require('graphql');
// const { ApolloServer, gql } = require('apollo-server-express');

// graphql schema 
const schema = buildSchema(`
    type Query {
        message: String
    }
`)

// root resolver 
const root= {
    message: () => 'Hellow jay!'
};

// create an express server and graphql endpoint 
const app = express();

app.use('/graphql',graphqlHTTP({
      schema: schema,
      rootValue :root,
      graphiql: true,
    }),
  );

app.listen(4000,()=>console.log('Express Graphql running on localhost:4000/graphql'));
 
// const typeDefs = gql`
//   type Query {
//     hello: String
//   }
// `;
 




