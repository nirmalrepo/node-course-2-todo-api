/**
 * Created by nirmal on 4/16/17.
 */
var express=require('express');
var bodyParser=require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app=express();

//heroku port confguration
const port=procss.env.PORT||3000;

//middleware
app.use(bodyParser.json());

app.post('/todos',(req,res)=>{

    var todo=new Todo({
        text:req.body.text
    });

    todo.save().then((doc)=>{
        res.send(doc);
    },(e)=>{
        res.status(400).send(e);

    });
});
//Listing todos
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({
            todos
        })
    },(e)=>{
        res.status(400).send(e);

    });
});

//get by id /todos.123456
app.get('/todos/:id',(req,res)=>{
    var id=req.params.id;
    //valid id using isValid
        //404 - send back empty send
    const {ObjectId}=require('mongodb');
    if(!ObjectId.isValid(id)){

        return res.status(404).send({});
    }



    //findById
        //succsess
            //if todo-send it back
            //if no todo - send back 404 with empty body
        //error
            //400- and send empty body
    Todo.findById(id).then((todo)=>{
        if(!todo){
            return res.status(404).send({});
        }
           res.status(200).send({todo});

    },(e)=>{
        res.status(400).send(e);

        });
    });
app.listen(port,()=>{
    console.log(`Started on port ${port}`);
})


module.exports={
    app
};
