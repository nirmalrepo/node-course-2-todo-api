/**
 * Created by nirmal on 4/16/17.
 */

require('./config/config');

const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
const {ObjectId}=require('mongodb');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
var {authenticate}=require('./middleware/authenticate');

var app=express();

//heroku port confgurations
const port=process.env.PORT;

//middleware
app.use(bodyParser.json());

app.post('/todos',authenticate,(req,res)=>{

    var todo=new Todo({
        text:req.body.text,
        _creator:req.user._id
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);

    });
});
//Listing todos
app.get('/todos',authenticate,(req,res)=>{
    //find query with user is equal to req.user._id from authenticate
    Todo.find({_creator:req.user._id}).then((todos)=>{
        res.send({
            todos
        })
    },(e)=>{
        res.status(400).send(e);

    });
});

//get by id /todos.123456
app.get('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    //valid id using isValid
        //404 - send back empty send

    if(!ObjectId.isValid(id)){

        return res.status(404).send({});
    }



    //findById
        //succsess
            //if todo-send it back
            //if no todo - send back 404 with empty body
        //error
            //400- and send empty body
    Todo.findOne({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send({});
        }
           res.status(200).send({todo});

    },(e)=>{
        res.status(400).send(e);

        });
    });

app.delete('/todos/:id',authenticate,(req,res)=>{

    var id=req.params.id;
    if(!ObjectId.isValid(id)){

        return res.status(404).send({});
    }
    //findByIdAndRemove is previously used
    Todo.findOneAndRemove({
        _id:id,
        _creator:req.user._id
    }).then((todo)=>{
        if(!todo){
            return res.status(404).send({});
        }
        res.status(200).send({todo});

    },(e)=>{
        res.status(400).send(e);

    });

});


//update
app.patch('/todos/:id',authenticate,(req,res)=>{
    var id=req.params.id;
    var body =_.pick(req.body,['text','completed']) //important:here we take body from request and map with our required object attribute using loadash
    if(!ObjectId.isValid(id)){

        return res.status(404).send({});
    }
    if(_.isBoolean(body.completed) && body.completed){
        body.completedAt=new Date().getTime();
    }else {
        body.completed=false;
        body.completedAt=null
    }

    Todo.findOneAndUpdate({_id:id,_creator:req.user._id},{$set:body},{new:true}).then((todo)=>{
        if(!todo){
            return res.status(404).send({});
        }
        res.status(200).send({todo});
    }).catch((e)=>{
        res.status(400).send(e);
    });
});

// POST /users
app.post('/users',(req,res)=>{
    var body=_.pick(req.body,['email','password']);
    var user=new User(body);
     //model methods

    user.save().then(()=>{
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);

    }).catch((e)=>{
        res.status(400).send(e);

    });
});




app.get('/users/me',authenticate,(req,res)=>{
        res.send(req.user);
});

//old one
// app.get('/users/me',authenticate,(req,res)=>{
//     var token=req.header('x-auth');
//     //Model method
//     User.findByToken(token).then((user)=>{
//         if(!user){
//             return Promise.reject();
//         }
//         res.send(user);
//     }).catch((e)=>{
//         res.status(401).send();
//     });
// });


//POST /users/login {email, password}

app.post('/users/login',(req,res)=>{
    var body=_.pick(req.body,['email','password']);

    //if we use then the pertcular model method needs to be a promise
    User.findByCredentials(body.email,body.password).then((user)=>{
       return user.generateAuthToken().then((token)=>{

            res.header('x-auth',token).send(user);
       });
    }).catch((e)=>{
        res.status(400).send();

    })
});


app.delete('/users/me/token',authenticate,(req,res)=>{
    //instance method
    req.user.removeToken(req.token).then(()=>{
        res.status(200).send();
    },()=>{
        res.status(400).send();

    });

});

app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


module.exports={
    app
};
