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

    // findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({
    //     _id:new ObjectID('58f1ed8b1a1ef1969461aa24')
    // },{
    //     // $set is update operator
    //     $set:{
    //         completed:true
    //     }
    // },{
    //     returnOriginal:false
    // }).then((result)=>{
    //     console.log(result)
    // });

    db.collection('Users').findOneAndUpdate({
        _id:new ObjectID('58f1f1231a1ef1969461aaf0')
    },{
        // $set is update operator
        $set:{
            name:'Nirmal'
        },
        $inc:{
            age:-2
        }
    },{
        returnOriginal:false
    }).then((result)=>{
        console.log(result)
    });
});