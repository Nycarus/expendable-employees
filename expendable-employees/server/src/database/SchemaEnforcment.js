var Validator = require('jsonschema').Validator;
var fs = require('fs');
dbschema = JSON.parse(fs.readFileSync('./enforced_schema.json', 'utf8'));




function validateSchama(instance,tableName){
    var v = new Validator();    
    return v.validate(instance,dbschema[tableName]);
}

module.exports = validateSchama;


/*
var UsrInstance = {
        "firstname" : "string",
        "lastname" : "string",
        "email" : "string",
        "phone" : "string",
        "address" : "string",
        "postal_code" : "string",
        "date_of_birth" : Date.now().toISOString,
        "password" : 1000
};
console.log(Date.now().toString());
console.log(validateSchama(UsrInstance,"User"));

*/