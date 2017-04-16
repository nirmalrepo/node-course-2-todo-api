/**
 * Created by nirmal on 4/16/17.
 */
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
const {ObjectId}=require('mongodb');

var id='58f36eb89cf0f8be7f109131';
var userId='58f32bba156997b83090c513';


// if(!ObjectId.isValid(id)){
//
//         return console.log('Id not valid');
// }

// Todo.find({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });
//
// Todo.findOne({
//     _id:id
// }).then((todos)=>{
//     console.log('Todos',todos);
// });

Todo.findById(id).then((todo)=>{
    if(!todo){
        return console.log('Id not found');
    }
    console.log('Todo by id',todo);
}).catch((e)=>{console.log(e)});


User.findById(userId).then((user)=>{
    if(!user){
        return console.log('User not found');
    }
    console.log('User by id',user);
}).catch((e)=>{console.log(e)});