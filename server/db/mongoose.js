/**
 * Created by nirmal on 4/16/17.
 */
var mongoose=require('mongoose');

//built in promise library
mongoose.Promise=global.Promise;

//db connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp');

module.exports={mongoose};
