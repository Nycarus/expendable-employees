let express = require('express');
let session = require('express-session');
const { v4: uuidv4 } = require('uuid');
let app = express();


let CustomerDataBaseOperations = require('./src/database/CustomerDataBaseOperations');
let cdo = new CustomerDataBaseOperations();



// expects email in form of http://localhost:3001/api/isEmailTaken?email=userEmail

app.get('/api/isEmailTaken', function(request, response) {
    query = {
        email : request.query.email
    };

    result = cdo.isEmailTaken(query);
    result.then(function(data){
        response.send({"isTaken" : data});

    });
    
});
/*
 expects  of http://localhost:3001/api/register/user?firstname=name&lastname=lastnam&email=j1e@emali.com&
phone=444-444-444&address=43%20main&postal_code=L1G4Y0&date_of_birth=2020/01/30&password=password
*/

app.get('/api/register/user', function(request, response) {
    cdo.registerUser(request.query).then(function(result){
        response.send(result);

    });    
});


/*
http://localhost:3001/api/register/company?firstname=name&lastname=lastnam&email=j1sse@test.com&phone=444-444-444&
address=43%20main&postal_code=L1G4Y0&date_of_birth=2020/01/30&password=password&
company_name=mcdonalds&branch_name=Oshawa

*/
app.get('/api/register/company', function(request, response) {
    cdo.registerCompany(request.query).then(function(result){
        response.send(result);
    });    
});


app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});