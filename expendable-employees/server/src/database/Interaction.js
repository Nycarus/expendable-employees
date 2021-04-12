const MongoClient = require('mongodb').MongoClient;

class DatabaseManagment {
    constructor(){
        this.url = "mongodb+srv://dbUser:mER6V5dlVljmcy0x@cluster0.wxnsv.mongodb.net/test"
        this.options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        };
    }
   
    
    async insertToCollection(data,collection,databaseName = "expendableEmployees" ) {
        
        try {
            var db = await MongoClient.connect(this.url, this.options);
    
            if(db == undefined){
                return false;
            }
            
            var dbo = db.db(databaseName);
            
            let reuslts = await dbo.collection(collection).insertOne(data);
            
            if(reuslts == undefined){
                return false;
            }

            db.close();

            return true;
        } catch(err) {
            console.log(err);
            
            if(db !== undefined){
                db.close();
            }
            return false;
        } 
    }
    
    async queryCollection(query,collection,databaseName = "expendableEmployees") {
        try {
            var db = await MongoClient.connect(this.url, this.options);
            var dbo = db.db(databaseName);
            

            let retults = await dbo.collection(collection).find(query).toArray();
            db.close();

            return retults;    
        } catch(err) {
            console.log(err);
            
            if(db !== undefined){
                db.close();
            }
            return false;
        }      
    }

    async dropDocument(query,collection,databaseName = "expendableEmployees") {
        try {
            var db = await MongoClient.connect(this.url, this.options);
            var dbo = db.db(databaseName);
            

            await dbo.collection(collection).deleteOne(query);
            db.close();
            return true;
        } catch(err) {
            console.log(err);
            
            if(db !== undefined){
                db.close();
            }
            return false;
        } 
    }

    async updateDocument(query,replacment_document,collection, databaseName = "expendableEmployees"){
        try {
            var db = await MongoClient.connect(this.url, this.options);
            var dbo = db.db(databaseName);
            console.log(replacment_document)
            await dbo.collection(collection).updateMany(query,{$set : replacment_document});
            db.close();
            return true;
        } catch(err) {
            console.log(err);
            
            if(db !== undefined){
                db.close();
            }
            return false;
        }


    }
}
module.exports = DatabaseManagment;
