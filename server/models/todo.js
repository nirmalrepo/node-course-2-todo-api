/**
 * Created by nirmal on 4/16/17.
 */
var mongoose=require('mongoose');
//create a model
var Todo=mongoose.model('Todo',{
    text:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    },
    _creator:{
        //user property
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }

});

// // cerate document
// var newTodo= new Todo({
//     text:' Edit this video new',
//
// });
//
// newTodo.save().then((doc)=>{
//     console.log('Save todo',doc)
// },(e)=>{
//     console.log('Unable to save todo')
// });

module.exports={Todo};