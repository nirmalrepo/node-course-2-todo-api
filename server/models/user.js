/**
 * Created by nirmal on 4/16/17.
 */
const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require('jsonwebtoken');
const _=require('lodash');
const bycrypt=require('bcryptjs');

var UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        minlength:1,
        trim:true,
        unique:true,
        validate:{
            validator:validator.isEmail,
            // validator:(value)=>{
            //     return validator.isEmail(value)
            // },
            message:'{VALUE} is not a valid email'
        }
    },
    password:{
        type:String,
        require:true,
        minlength:6
    },
    //tokens is array
    tokens:[{
        access:{
            type:String,
            required:true
        },
        token:{
            type:String,
            required:true
        }
    }]
});
UserSchema.methods.toJSON=function () {
    var user=this;
    var userObject=user.toObject();

    return _.pick(userObject,['_id','email'])
}

//instance methods
UserSchema.methods.generateAuthToken=function () {
    var user=this;
    var access='auth';
    var token=jwt.sign({_id:user._id.toHexString(),access},process.env.JWT_SECRET).toString();
    user.tokens.push({access,token});
    //returning two promisses
    return user.save().then(()=>{
        return token;
    });

};

UserSchema.methods.removeToken=function (token) {
    var user=this;

    // $pull is used to remove any object from array
   return user.update({
        $pull:{
            tokens:{
                token:token
            }
        }
    })

};

//define findByToken model methods via Schema using statics
UserSchema.statics.findByToken=function (token) {
    var User=this;
    var decoded;

    try {
        decoded =jwt.verify(token,process.env.JWT_SECRET)

    }catch (e){
        // return new Promise((resolve,reject)=>{
        //
        // reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id':decoded._id,
        'tokens.token':token,
        'tokens.access':'auth'
    })
}

UserSchema.statics.findByCredentials=function (email, password) {
    var User=this;


    return User.findOne({email}).then((user)=>{

        if(!user){
            return Promise.reject();
        }
        //bycrypt.compare only supports call backs but we use onsode promise
        return new Promise((resolve,reject)=>{
            bycrypt.compare(password,user.password,(err,res)=>{
                if(res){
                    resolve(user);
                }else{

                    reject();
                }
            });

        })
    })
}

//This middleware run prior to save function to hash password
UserSchema.pre('save',function (next) {
    var user=this;
    //to avoid hashing password again and again this run when user modified the passworf
    if(user.isModified('password')){

        // generate salt then hash
        var password=user.password;
        bycrypt.genSalt(10,(err,salt)=>{
            bycrypt.hash(password,salt,(err,hash)=>{
                user.password=hash;
                next();
            });
        });
    }else {
        next();
    }
});

//create a model for users
var User=mongoose.model('Users',UserSchema);

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