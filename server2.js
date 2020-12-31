const express = require('express');
const { graphqlHTTP } = require('express-graphql');
var {buildSchema } = require('graphql');
// const { ApolloServer, gql } = require('apollo-server-express');

// graphql schema 
const schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(topic: String): [Course]
    },
    type Mutation{
        updateCourseTopic (id:Int,topic:String) : Course
    },
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`)


// some dummy data to fetch 

var coursesData = [
    {
        id: 1,
        title: 'The Complete Node.js Developer Course',
        author: 'Andrew Mead, Rob Percival',
        description: 'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs/'
    },
    {
        id: 2,
        title: 'Node.js, Express & MongoDB Dev to Deployment',
        author: 'Brad Traversy',
        description: 'Learn by example building & deploying real-world Node.js applications from absolute scratch',
        topic: 'Node.js',
        url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/'
    },
    {
        id: 3,
        title: 'JavaScript: Understanding The Weird Parts',
        author: 'Anthony Alicea',
        description: 'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
        topic: 'JavaScript',
        url: 'https://codingthesmartway.com/courses/understand-javascript/'
    }
]

var getCourse =function(args){
    return coursesData.filter(course=>{
        return course.id ==args.id;
    })[0];    //select the  1st element of arr which is returning
}
var getCourses =function(args){
    console.log("args",args);
    if(args.topic){
      return coursesData.filter(courses=>
        { 
            return courses.topic == args.topic;
        })   
    }else{
        return coursesData;
    }
   
}
var updateCourseTopic = function({id, topic}){
        coursesData.map(course=>{
            if(course.id === id){
                course.topic = topic
                return course ; 
            }
        });
        return coursesData.filter(course=>{
            return course.id === id
        })[0];

}

// root resolver 
const root= {
      course:getCourse,
      courses:getCourses,
      updateCourseTopic : updateCourseTopic
};

// create an express server and graphql endpoint 
const app = express();

app.use('/graphql',graphqlHTTP({
      schema: schema,
      rootValue :root,
      graphiql: true,
    }),
  );

app.listen(1000,()=>console.log('Express Graphql running on localhost:1000/graphql'));
 








// # query getSingleData($courseId: Int!) {
//     #   course(id: $courseId) {
//     #     title
//     #     id
//     #     description
//     #     url
//     #   }
//     # }
//     #-----------query variable---------------#
//     # {
//     #   "courseId": 1
//     # }
    
//     # =====================================================
//     # query getDataByTopic($courseTopic : String) {
//     #   courses(topic: $courseTopic) {
//     #     title
//     #     id
//     #     description
//     #     url
//     #   }
//     # }
//     # #-----------query variable---------------#
//     # {
//     #   "courseTopic": "Node.js"
//     # }
//     # =====================================================
//     # query getCoursesFragments($courseId : Int!,$courseId2 : Int!) 
//     # {
//     #   course1:course(id:$courseId){
//     #     ...coursFields
//     #   }
//     #   course2:course(id:$courseId2){
//     #     ...coursFields
//     #   }
//     # }
//     # fragment coursFields on Course{
//     #     title
//     #     id
//     #     description
//     #     url
//     # }
//     # #-----------query variable---------------#
//     # {
//     #   "courseId": 1,
//     #   "courseId2": 34
//     # }
//     # =====================================================
//     # mutation updateCourseTopic($courseId : Int!,$topic : String!) 
//     # {
//     #   updateCourseTopic(id:$courseId ,topic:$topic){
//     #     ...coursFields
//     #   }
//     # }
    
//     #  fragment coursFields on Course{
//     #     title
//     #     id
//     #     description
//     #     topic
//     #     url
//     # }
//     # #-----------query variable---------------#
    
//     # {
//     #   "courseId" : 1,
//     #   "topic"    : "Javascript2"
//     # }
