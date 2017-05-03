/**
 * Created by nirmal on 4/17/17.
 */
//To add new db for testig
var env=process.env.NODE_ENV||'development';

if(env==='development' || env==='test'){
    var config=require('./config.json');
    var envConfig=config[env];

    //take object return keys in an array
    Object.keys(envConfig).forEach((key)=>{
        process.env[key]=envConfig[key];
    });


}

// Old one
// if(env==='development'){
//     process.env.PORT=3000;
//     process.env.MONGOLAB_URI='mongodb://localhost:27017/TodoApp';
// }else if(env==='test'){
//     process.env.PORT=3000;
//     process.env.MONGOLAB_URI='mongodb://localhost:27017/TodoAppTest';
//
// }

// heroku configs
// 1.heroku config
// 2.heroku config:set JWT_SECRET=addffadsd34335hj
// 3.heroku config:unset JWT_SECRET

