/**
 * Created by nirmal on 4/17/17.
 */
//To add new db for testig
var env=process.env.NODE_ENV||'development';

if(env==='development'){
    process.env.PORT=3000;
    process.env.MONGOLAB_URI='mongodb://localhost:27017/TodoApp';
}else if(env==='test'){
    process.env.PORT=3000;
    process.env.MONGOLAB_URI='mongodb://localhost:27017/TodoAppTest';

}