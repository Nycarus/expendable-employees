let express = require('express');
let bodyParser = require('body-parser');
var cors = require('cors')

let app = express();
const jwt = require("jsonwebtoken")
require("dotenv").config();

app.use(bodyParser.json());
app.use(cors())
app.options('*', cors());

let CustomerDataBaseOperations = require('./src/database/CustomerDataBaseOperations');
const { query } = require('express');
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
    this function expects the payload to be 
    payload {
        "firstname" : "firstname",
        "lastname" : "lastname",
        "date_of_birth" : "Date",
        "phone" : "phone numb",
        "address" : address,
        
    }
*/

app.post("/api/user/update", authToken, function(request,response){
    request.body.user_id = request.user_id.user_id;
    let data = request.body
    console.log(data);

    if(data.firstname == undefined || data.lastname == undefined || data.date_of_birth == undefined || data.phone == undefined || data.address == undefined ){
        return response.sendStatus(400);
    }
    
    cdo.updateUser(data).then(function(value){
        return response.send(value);
    });
    

});


/*
    expects the the json 
    
    payload =  {
        'firstname': 'Cole',
        "lastname": "Smith",
        "date_of_birth" : "2020-01-01",
        "phone": "905-936-1234",
        "address": "37 main street",
        "postal_code": "L0G 1W0",
        "Position" : "string",
        "pay_rate" : "float"
        "email": "cole@gmails.com",
        "password": "password"
    } 

*/
app.post("/api/register/employee",authToken, function(request,response){
    let admin_query = {
        "user" : request.user_id.user_id,
    };

    cdo.getAdmin(admin_query).then(function(result){
        console.log(result);
        if(result.length < 1){
            return response.sendStatus(401);
        }
        console.log(request.body);

        request.body.company_id = result.company;
        cdo.registerEmployee(request.body);        

    });
})

    /*
    cdo.isAdminForCompany(admin_query).then(function(result){
        if(result){
            cdo.getCompanyUsers(admin_query).then(function(query_result){
                request.body.employee.company_id = query_result.company_id;

                cdo.registerEmployee(request.body).then(function(insert_result){
                    response.send(insert_result);
                });
            })
        }else{
            response.sendStatus(401);

        }
    }); 
   
            
    // check if user email is same as email from token
    // check if email for token is an admin for any company 
    // requested user is apart of 


    // make can admin function 
    // will return if the said admin is an admin over user 
});
 */
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

// gets the senders user infomration from database
app.get("/api/self/user",authToken, function(request,response){
    let query = {
        "user_id" : request.user_id.user_id
    };
    cdo.getUser(query).then(function(result){
        response.send(result);
    });
});

/*
// an admin call for getting a user, will return personal information

expects payload to be 
payload = {
    "user_id" : User._id
}
*/
app.get("/api/admin/user",authToken, function(request,response){
    if(request.body.user_id == undefined){
        return response.send(400);
    }

    let query = {
        "admin_id" : request.user_id.user_id,
        "user_id" : request.body.user_id
    }
    cdo.isAdminOverUser(query).then(function(result){
        if(result){
            cdo.getUser(query).then(function(result){
                response.send(result);
            });
        }else{
            response.send(403);
        }
    });

});

/* 
    payload = {
        "receivers" : [
            "User_id,
            "User._id1",
            "User._id....",
        ],
        "message" : "email message"
        "title" : "title"
    }

*/


app.post("/api/email/send",authToken, function(request,response){
    request.body.sender = request.user_id.user_id;

    cdo.sendEmail(request.body).then(function(result){
        if(result.success){
            response.send(result);
        }else{
            
            response.sendStatus(result.code);
        }
    })
});

app.post("/api/email/mark_read"), authToken, function(request, response){
    for (let i = 0; i < request.body.user_id.length; i++ )
    {
        cdo.readEmail(request.body.user_id[i]).then(function(result){
            if(result.success){
                response.send(result);
            }else{
                
                response.sendStatus(result.code);
            }
        })
    }
}

app.get("/api/email/sent",authToken, function(request,response){
    request.body.user_id = request.user_id.user_id;

    cdo.sentEmails(request.body).then(function(results){
        response.send(results);
    });   
});

// doesnt expect any payload  will use auth user id
app.get("/api/email/receive",authToken, function(request,response){
    request.body.user_id = request.user_id.user_id;
    
    cdo.receiveEmails(request.body.user_id).then(function(results){
        response.send(results);
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

/*

This is meant for the user to change their own password
expets payload = {
    "password" : "newpassword"
}
*/

app.post("/api/reset/password",authToken, function(request,response){
    if(request.body.password == undefined){
        response.send(400);
    }
    request.body.user_id = request.user_id.user_id;
    cdo.resetPassword(request.body).then(function(password_change){
        return response.send(password_change);
    });

});

// only an admin to that employee can reset the password
/* 
    payload = {
        "user_id" : "Employee._id",
        "password" : "newpassword"
    }

*/
app.post("/api/reset/employee/password",authToken, function(request,response){
        
        let admin_verify_query = {
            "admin_id" : request.user_id.user_id,
            "user_id": request.body.user_id
        }
        if(request.body.password == undefined || request.body.user_id == undefined ){
            response.send(400);
        }

        cdo.isAdminOverUser(admin_verify_query).then(function(result){
            if(result || request.user_id.user_id == request.body.user_id){
                cdo.resetPassword(request.body).then(function(password_change){
                    return response.send(password_change);
                });
                
            }else{
                response.sendStatus(401);
            }
        });

});


// expects email in form of http://localhost:3001/api/isEmailTaken?email=userEmail
app.get('/api/isEmailTaken', function(request, response) {
    let query = {
        email : request.query.email
    };

    result = cdo.isEmailTaken(query);
    result.then(function(data){
        response.send({"isTaken" : data});

    });
    
});

app.get("/api/company/users",authToken, function(request,response){
    let query = {
        "user_id" : request.user_id.user_id
    };

    cdo.getUsersCompany(query).then(function(company_id){
        if(!company_id){
            return response.sendStatus(400);
        }
        cdo.getCompanyUsers({"company_id" : company_id}).then(function(users){
            console.log(users)
            if(!users){
                return response.sendStatus(500);
            }

            return response.send(users);
        });
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

app.get('/api/schedule/user', authToken, function(request, response) {
    request.body.user_id = request.user_id.user_id;

    cdo.getUserSchedule(request.body.user_id).then(function(result){
        response.send(result);
    })
});

app.post('/api/schedule/add/multiple', authToken, function(request, response) {
    let temp = {};
    for ( let i = 0; i < request.body.user_id; i ++) {
        temp = {"user_id" : request.body.user_id[i], "startDate" : request.body.startDate, "endDate" : request.body.endDate, "title": request.body.title}
        cdo.addUserSchedule(temp).then(function(result){
            
        })
    }
});

app.post('/api/remove/user/single', authToken, function(request, response) {
    cdo.removeUser(request.body.user_id[i]).then(function(result){})

    cdo.removeEmployee(request.body.user_id[i]).then(function(result){})
});

app.post('/api/remove/employee/multiple', authToken, function(request, response) {
    for ( let i = 0; i < request.body.user_id; i ++) {
        cdo.removeUser(request.body.user_id[i]).then(function(result){})

        cdo.removeEmployee(request.body.user_id[i]).then(function(result){})
    }
});

app.post('/api/edit/employee/multiple/pay', authToken, function(request, response) {
    for ( let i = 0; i < request.body.user_id; i ++) {
        cdo.editEmployeePay(request.body.user_id[i]).then(function(result){})
    }
});

app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), function() {
    console.log(`Listening for requests on port ${app.get('port')}.`);
});