import { User } from "./model/user";

export const resolvers = {
    Query:{
        message:()=>"jay kar",
        user:()=> User.find()
    },
    Mutation:{
        CreateUser:async(_,{name})=>{
            console.log("name==",name);
            const userData = new User({name});
            await userData.save();
            return userData;
        }
    }
}