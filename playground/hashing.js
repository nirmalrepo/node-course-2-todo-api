/**
 * Created by nirmal on 4/18/17.
 */
const {SHA256}=require('crypto-js');

// var message= 'I am user number 3';
// var hash= SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);
//
// var data={
//     id:4
// };
// //somesecret is a salt
// var token={
//     data,
//     hash:SHA256(JSON.stringify(data)+'somesecret').toString()
// };
//
// var resultHash=SHA256(JSON.stringify(token.data)+'somesecret').toString();
//
// if(resultHash==token.hash){
//     console.log('Data was not changed');
// }else {
//
//     console.log('Data was changed. Do not trust!');
// }
// -----------------------------------------------
const jwt=require('jsonwebtoken');
//
// var data={
//     id:4
// };
//
// var token=jwt.sign(data,'123abc'); //takes the object and creates the hash and return the token
// console.log(token);
// var decoded=jwt.verify(token,'123abc') //it takes the token and secret and make sure data is not manipulated
// console.log(decoded);

// -------------------------------------------------

const bycrypt=require('bcryptjs');

var password='123abc!';
//10 is the no of round
// bycrypt.genSalt(10,(err,salt)=>{
//     bycrypt.hash(password,salt,(err,hash)=>{
//         console.log(hash);
//     })
// });

var hashedPassword='$2a$10$jFnCn6Z1Z/moyiRQOYyK6O.hhY.TVIap0uCuKj8rKcZrmSiIhmv8y';
bycrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res)
});