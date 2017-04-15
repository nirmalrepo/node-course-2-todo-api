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


    //Find in the collection

    // db.collection('Todos').find({completed:false}).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    // db.collection('Todos').find({
    //     _id:new ObjectID('58f1ed8b1a1ef1969461aa24')
    // }).toArray().then((docs)=>{
    //     console.log('Todos');
    //     console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });

    db.collection('Todos').find().count().then((count)=>{
        console.log(`Todos count ${count}`);

    },(err)=>{
        console.log('Unable to fetch todos',err);
    });

    db.collection('Users').find().toArray().then((docs)=>{
        console.log('Users');
            console.log(JSON.stringify(docs,undefined,2));

    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
    db.collection('Users').find().count().then((count)=>{
        console.log(`Users count ${count}`);

    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
    db.close();
});