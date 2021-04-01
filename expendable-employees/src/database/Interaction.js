const MongoClient = require('mongodb').MongoClient;

class DatabaseManagment {
    constructor(){
        this.url = "mongodb+srv://dbUser:mER6V5dlVljmcy0x@cluster0.wxnsv.mongodb.net/test/"
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        };
        this.connect =  MongoClient.connect(this.url, this.options);
    }
   
    insertToCollection(data,collection,databaseName = "expendableEmployees" ) {
        
        try {

            this.connect.then(function(db) {
            
                var dbo = db.db(databaseName);
                
                dbo.collection(collection).insertOne(data, function() {    
                    db.close();
                });
        
            });

        } catch(err) {
            console.log(err);
            db.close();
        } 
    }
    async queryCollection(query,collection,databaseName = "expendableEmployees") {
        try {
            let db = await this.connect;
            var dbo = db.db(databaseName);
            

            let retults = await dbo.collection(collection).find(query).toArray();
            db.close();

            return retults;    
        } catch(err) {
            console.log(err);
            db.close();
        }      
    }

    async dropDocument(query,collection,databaseName = "expendableEmployees") {
        try {
            let db = await this.connect;
            var dbo = db.db(databaseName);
            

            await dbo.collection(collection).deleteOne(query);
            db.close();

        } catch(err) {
            console.log(err);
        } 
    }
}

/*
//example drop
t = new DatabaseManagment();
query = {
    firstname:"Cole 1"
}
t.dropDocument(query,"User")
*/


/* 
//example query 
t = new DatabaseManagment();
query = {
    firstname:"Cole 1"
}
var fs = require("fs");

t.queryCollection(query,"User").then( function(data){
    console.log(data);    
});
*/


/* 
//example insert
t = new DatabaseManagment();
let url = "https://www.planetware.com/wpimages/2020/03/best-hot-air-balloon-rides-cappadocia-turkey.jpg"
const request = require('request');

request({ url, encoding: null }, (err, resp, buffer) => {
    data = {
        firstname:"Cole 1",
        lastname: "lastname 2",
        email: "notreal@gmail.com",
        phone:"904-456-7891",
        address:"137 Main Street",
        postal_code:"L1J 1W0",
        date_of_birth: new Date(),
        password:"someEncrytedString",
        picture: buffer,
    
    }
    t.insertToCollection(data,"User");
});*/
