let express = require('express');
let bodyParser = require('body-parser');
let app = express();
const jwt = require("jsonwebtoken")
require("dotenv").config();

app.use(bodyParser.json());

let CustomerDataBaseOperations = require('./src/database/CustomerDataBaseOperations');
let cdo = new CustomerDataBaseOperations();



/*
    expects json in form of 
    payload = {
        "email" : "email@email.com",
        "password" : "anystring"
    }
*/
app.post('/api/login', function(request, response) {
    if(request.body.email === undefined || request.body.password === undefined){
        return response.sendStatus(400)
    }
    
     cdo.getHashedPassword(request.body.email).then(function(hashed_password){
        if(!hashed_password.success){
            return response.send(hashed_password.code);
        }

        cdo.compareHashedPassword(request.body.password,hashed_password["user"].password).then( function(result){
            if(!result){
                return response.sendStatus(401);
            }
            let user = {
                user_id: hashed_password.user._id.toString()
            };

            console.log(user);
            let token = {
                token : jwt.sign(user,process.env.ACCESS_TOKEN_SECRET)
            };
            return response.json(token);
            
        });
        
     });
});



/*
    expects the the json 
    
    payload =  {
        "user_id" : "User._id",
        "Position" : "string",
        "company_id" : "Company._id",
        "pay_rate" : "float"
    } 

*/
app.post("/api/register/employee",authToken, function(request,response){
        let admin_query = {
            "user" : request.user_id.user_id,
            "company" : request.body.company_id
        };

        cdo.isAdminForCompany(admin_query).then(function(result){
            if(result){
                cdo.registerEmployee(request.body).then(function(insert_result){
                    response.send(insert_result);
                });
            }else{
                response.sendStatus(401);

            } 
        });        
        // check if user email is same as email from token
        // check if email for token is an admin for any company 
        // requested user is apart of 


        // make can admin function 
        // will return if the said admin is an admin over user 
})
;
/*
payload =  {
    "user" : "User._id",
    "company" : "Company._id",
  
} 
*/

app.post("/api/register/admin",authToken, function(request,response){
    let admin_query = {
        "user" : request.user_id.user_id,
        "company" : request.body.company
    };
    cdo.isAdminForCompany(admin_query).then(function(result){
        if(result){
            cdo.registerAdmin(request.body).then(function(insert_result){
                response.send(insert_result);
            });
        }else{
            response.sendStatus(401);

        } 
    });  


});

/* 
    payload = {
        "receivers" : [
            "User._id",
            "User._id2",
            "User._id...",
        ],
        "message" : "email message"
    }

*/

app.post("/api/email/send",authToken, function(request,response){

    request.body.sender = request.user_id.user_id;
    cdo.sendEmail(request.body).then(function(result){
        response.send(result);
    });

    
});


function authToken(request,response,next){
    let header = request.headers["authorization"];
    if(!header){
        return response.sendStatus(401);
    }

    let token = header.split(" ")[1];
    if(!token){
        return response.sendStatus(401);
    }

    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(error,id){
        if(error){
            return response.sendStatus(403);
        }
        request.user_id = id;
        next()
    });
    
}



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
example payload 


payload = { 'firstname': 'Cole',
            "lastname": "Smith",
            "email": "cole@gmails.com",
            "phone": "905-936-1234",
            "address": "37 main street",
            "postal_code": "L0G 1W0",
            "date_of_birth" : "2020-01-01",
            "password": "password"
        }

*/

app.post('/api/register/user', function(request, response) {

    cdo.registerUser(request.body).then(function(result){
        response.send(result);

    });    
});


/*
example payload 
payload = { 
            "user" : {
                'firstname': 'Cole',
                "lastname": "Smith",
                "email": "cole@gmails.com",
                "phone": "905-936-1234",
                "address": "37 main street",
                "postal_code": "L0G 1W0",
                "date_of_birth" : "2020-01-01",
                "password": "password"    
            },
            "company" : {
                "name" : "Mcdonalds"
            },
            "branch" : {
                "name" : "Oshawa branch"
            }
}

*/
app.post('/api/register/company', function(request, response) {
    cdo.registerCompany(request.body).then(function(result){
        response.send(result);
    });    
});



app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});