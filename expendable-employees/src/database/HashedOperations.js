
// https://www.npmjs.com/package/bcrypt


const bcrypt = require('bcrypt');
const saltRounds = 10;

// takes in the raw user
function insertHashedUser(user,databaseManagmentInstance) {
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(user["password"], salt, function(err, hash) {
            // Store hash in your password DB.
            user["password"] = hash;
            databaseManagmentInstance.insertToCollection(user,"User");
        });
    });
}

async function authenticatePassword(email,plaintext, databaseManagmentInstance) {
    query = {
        "email" : email 
    };

    query_result = await databaseManagmentInstance.queryCollection(query,"User");

    if(query_result.length  == 1){
        return await bcrypt.compare(plaintext, query_result[0].password);
    }else if(query_result.length > 1){
        console.log("There are two accounts with the same email");
        return new Promise(function(){return false});
    }else{
        return new Promise(function(){return false});
    }
    
}

/*
// example of authenthecation password
var DatabaseManagment = require('./Interaction.js');
t = new DatabaseManagment();
email = "notreal@gmail.com";
password = "someEncrytedString";

authenticatePassword(email,password,t).then( function(data){
    console.log(data);    
})
*/
/*
// example safe password insertion
var DatabaseManagment = require('./Interaction.js');
var fs = require("fs");

t = new DatabaseManagment();
let url = "https://www.planetware.com/wpimages/2020/03/best-hot-air-balloon-rides-cappadocia-turkey.jpg"
const request = require('request');

request({ url, encoding: null }, (err, resp, buffer) => {
    data = {
        firstname:"Hashed Cole",
        lastname: "lastname 2",
        email: "notreal@gmail.com",
        phone:"904-456-7891",
        address:"137 Main Street",
        postal_code:"L1J 1W0",
        date_of_birth: new Date(),
        password:"someEncrytedString",
        picture: buffer,
    
    }
    insertHashedUser(data,t);
});*/