/**
 * Created by nirmal on 4/15/17.
 */

//Object destructure
// var user={name:'Nirmal',age:25}
// var {name}=user;
// const MongoClient=require('mongodb').MongoClient; is equal to below
const {MongoClient,ObjectID}=require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{
    if(err){
       return console.log('Unable to connect')
    }
    console.log('Connected to Mongo DB Server');


    //Insert data to collection

    // db.collection('Todos').insertOne({
    //     text:'SOmething todo',
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert todo')
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
    //     name:'Nirmal',
    //     age:28,
    //     location:'Malkaduwawa',
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to insert user')
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });
    db.close();
});