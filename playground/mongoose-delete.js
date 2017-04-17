/**
 * Created by nirmal on 4/16/17.
 */
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {User}=require('./../server/models/user');
const {ObjectId}=require('mongodb');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// });


// Todo.findOneAndRemove({}).then((result)=>{
//     console.log(result);
// });


Todo.findByIdAndRemove('58f4ea782f059b7096b32d6f').then((todo)=>{
    console.log(todo);
});