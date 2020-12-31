import express from "express";
import mongoose from "mongoose";
import {ApolloServer,gql} from "apollo-server-express";
import {resolvers} from "./resolver";
import {typeDefs} from "./typeDefs";

const app =express();

const server = async()=>{

    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    try{
        await mongoose.connect("mongodb+srv://jayanta123:5555566jk@cluster0-gfofx.mongodb.net/mydb?retryWrites=true&w=majority",
                                 {useNewUrlParser:true, useUnifiedTopology: true})
    }catch(error){
       console.log("Error",error);
    }

    server.applyMiddleware({ app });
    app.get('/',(req,res)=>{
        res.send ("hello world")
    })

    app.listen({port:1000},()=>{
        console.log(`🚀 Server ready at http://localhost:1000${server.graphqlPath}`)
    })
}

server();



