//CRUD create read update and delete


const  {MongoClient, ObjectId} = require('mongodb')


const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = 'task-manager'


MongoClient.connect(connectionURL,{useNewURLParser: true,},(error,client) => {
        if(error){
            return console.log(error)
        }
       const db =  client.db(databaseName)
        
        //INSERTING A DOCUMENT
        // db.collection('users').insertOne({
        //     name: "Siraj",
        //     age: 23
        // },(error,result) => {
        //     if(error){
        //         return console.log(error)
        //     }
        //     console.log(result.insertedId)
        // })
        //INSERT MULTIPLE DOCS USING INSERTMANY
        // just like above, instead we use insertMany and insert two objects
        // followed by a ','


        //READING DOCUMENT
        // db.collection('users').findOne({ _id: new ObjectId("6139b396fca51b50942fbc54") }, (error, user) => {
        //     if(error){
        //         return console.log('Unable to fetch')
        //     }
        //     console.log(user)
        // })
        //  db.collection('tasks').findOne({description: "Pot plants"}, (error, task) => {
        //     if(error){
        //         return console.log('Unable to fetch the data')
        //     }
        //     console.log(task)
        //  })
        // db.collection('tasks').find({completed: false}).toArray((error,tasks) => {
        //     console.log(tasks)
        // } )


        


        //UPDATING A DOCUMENT
        // db.collection('users').updateOne({
        //     _id: new ObjectId("614329ae34726d197aa0c745")
        // },{
        //     $inc: {
        //         age: 1
        //     }
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })
        //UPDATE MANY
        // db.collection('tasks').updateMany({
        //     completed: false
        // },{
        //     $set: {
        //         completed: true
        //     }
        // }).then((result) => {
        //     console.log(result.modifiedCount)
        // }).catch((error) => {
        //     console.log(error)
        // })



        //DELETING A DOCUMENT
        // db.collection('users').deleteMany({
        //     age: 28
        // }).then((result) => {
        //     console.log(result)
        // }).catch((error) => {
        //     console.log(error)
        // })
        //DELETING ONE
        db.collection('tasks').deleteMany({
            description: "Clean the house"
        }).then((result) => {
            console.log(result.deletedCount)
        }).catch((error) => {
            console.log(error)
        })
})

// running mongodb server
// c:\users\gssir\mongodb\bin\mongod.exe --dbpath=c:\Users\gssir\mongodb-data