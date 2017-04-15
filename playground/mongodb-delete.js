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

    //deleteMany
    // db.collection('Todos').deleteMany({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    //deleteOne
    // db.collection('Todos').deleteOne({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed:false}).then((result)=>{
        console.log(result);
    });

    //Challange

    //deleteMany
    db.collection('Users').deleteMany({name:'Nirmal'}).then((result)=>{
        console.log(result);
    });

    //findOneAndDelete
    db.collection('Users').findOneAndDelete({_id:new ObjectID('58f1f11a1a1ef1969461aaec')}).then((result)=>{
        console.log(result);
    });

});