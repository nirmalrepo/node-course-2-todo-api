/**
 * Created by nirmal on 4/16/17.
 */
var mongoose=require('mongoose');
//create a model for users
var User=mongoose.model('Users',{
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true
    }
});

// var newUser= new User({
//     email:' wvfd@g.com',
//
// });
//
// newUser.save().then((doc)=>{
//     console.log('Save User',doc)
// },(e)=>{
//     console.log('Unable to save user')
// });

module.exports={User};