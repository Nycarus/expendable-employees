let DatabaseManagment = require('./Interaction.js');
let evalidator = require("email-validator");
let jsonValidator = require('./SchemaEnforcment');
var ObjectID = require('mongodb').ObjectID;

const bcrypt = require('bcrypt');
const saltRounds = 10;


function validateUser(data) {

    if (data["email"] == undefined) {
        return false;
    }
    if (!evalidator.validate(data["email"].replaceAll(" ", ""))) {
        return false;
    }

    return true;
};


class CustomerDataBaseOperations {

    constructor() {
        this.db_instance = new DatabaseManagment();
    }


    async hashPassword(password) {
        let salt = await bcrypt.genSalt(saltRounds);
        let hash = await bcrypt.hash(password, salt);
        return hash;

    }

    async compareHashedPassword(password, hash) {
        return await bcrypt.compare(password, hash);
    }

 
    async getHashedPassword(email){
        let query = {
            "email" : email
        }
        let user = await this.db_instance.queryCollection(query, "User");
        if(user.length < 1){
            return {"success": false,
                    "reason": "account not found",
                    "code" : 404}
        }
        return {success : true, "user" : user[0]}; 
    }

    // fixed bad queries
    async registerCompany(data) {
        if(data.user == undefined){
            return {"success" : false,
                    "reason" : "user entry is left blank"}
        }
        if(data.company == undefined) {
            return {"success" : false,
            "reason" : "company entry left blank"}
        }

        if(data.branch == undefined) {
            return {"success" : false,
            "reason" : "branch entry left blank"}
        }


        let success = await this.registerUser(data.user);
        if (!success.success) {
            return success;
        }

        let query = {
            email: data.user.email
        };

        let user = await this.db_instance.queryCollection(query, "User");

        data.company["owner"] = user[0]._id.toString() 

        

        success = await this.insertCompany(data.company);
        if (!success.success) {

            await this.db_instance.dropDocument(data.user, "User");
            // delete created user entry
            return success;
        }


        let company = await this.db_instance.queryCollection(data.company, "Company");

        data.branch["company_id"] = company[0]._id.toString()
        
        success = await this.registerBranch(data.branch);

        if (!success.success) {
            // delete created user and company entry 
            await this.db_instance.dropDocument(data.user, "User");
            await this.db_instance.dropDocument(data.company, "Company");
            return success;
        }

        let admin = {
            "user" : user[0]._id.toString(),
            "company" : company[0]._id.toString()
        }

        success = await this.registerAdmin(admin);


        if (!success.success) {
            // delete created user and company entry 
            await this.db_instance.dropDocument(data.user, "User");
            await this.db_instance.dropDocument(data.company, "Company");
            await this.db_instance.dropDocument(data.branch, "Branch");
            return success;

        }


        return success;



    }

    /*
        expects query = {
            "admin_id" : "User._id'
            "user_id" : "User_id"
        }
    */
    async isAdminOverUser(query) {
        
        let employee_query = await this.db_instance.queryCollection({"user_id" : query.user_id}, "Employee");

        if(employee_query.length < 1){
            return false;
        }

        let admin_query = await this.db_instance.queryCollection({"user" : query.admin_id, "company" : employee_query[0].company_id}, "Adminstrators");
        if(admin_query.length < 1){
            return false;
        }

        return true;


    }
    async isAdminForCompany(query) {
        
        var validation = jsonValidator(query,"Adminstrators");
        if(!validation.valid){
            return false;
        }

        let admin_query = await this.db_instance.queryCollection(query, "Adminstrators");
        
        if(admin_query.length > 0){
            return true
        }
        return false;
    }

    async registerAdmin(data){
        var validation = jsonValidator(data,"Adminstrators");
        if(!validation.valid){
            return{
                "success": false,
                "reason" : validation.errors
            }
        }
        try {
            var company_query = await this.db_instance.queryCollection({"owner" : new ObjectID(data.company)}, "Company");

            // making sure the owner company exists
            var user_query = await this.db_instance.queryCollection({"_id" : new ObjectID(data.user)}, "User");

        }catch(err){
            return {
                "success": false,
                "reason": "either use or company id is invalid"
            } 
        }
        
        // making sure there is not already a branch with these parameters
        if (company_query.length > 0) {
            return {
                "success": false,
                "reason": "there is already a company with that name to that owner"
            };
        } else if (user_query.length < 1) {
            return {
                "success": false,
                "reason": "the owner of that branch doesnt exist"
            };

        }

        let result = await this.db_instance.insertToCollection(data, "Adminstrators");
        if (result) {
            return {
                "success": true
            }
        } else {
            return {
                "success": false,
                "reason": "was unable to insert into company collection"
            }
        }
        
    }

    // expects data to be what is defined in the company schema - id
    async insertCompany(data) {
        var validation = jsonValidator(data,"Company");
        if(!validation.valid){
            return{
                "success": false,
                "reason" : validation.errors
            }
        }
        let company_query = await this.db_instance.queryCollection({"owner" : new ObjectID(data.owner)}, "Company");

        // making sure the owner company exists
        let user_query = await this.db_instance.queryCollection({"_id" : new ObjectID(data.owner)}, "User");


        // making sure there is not already a branch with these parameters
        if (company_query.length > 0) {
            return {
                "success": false,
                "reason": "there is already a company with that name to that owner"
            };
        } else if (user_query.length < 1) {
            return {
                "success": false,
                "reason": "the owner of that branch doesnt exist"
            };
        } else {
            let result = await this.db_instance.insertToCollection(data, "Company");
            if (result) {
                return {
                    "success": true
                }
            } else {
                return {
                    "success": false,
                    "reason": "was unable to insert into company collection"
                }
            }
        }
    }
    // expects data to be what is defined in the Branch schema - id
    // this function is onyl to be used in registration.
    async registerBranch(data) {
        var validation = jsonValidator(data,"Branch");
        if(!validation.valid){
            return{
                "success": false,
                "reason" : validation.errors
            }
        }

        let company_query = await this.db_instance.queryCollection({"owner" : new ObjectID(data.company_id)}, "Company");

        // making sure the owner company exists
        let user_query = await this.db_instance.queryCollection({"_id" : new ObjectID(data.user_id)}, "User");

        // making sure there is not already a branch with these parameters
        if (branch_query.length > 0) {
            return {
                "success": false,
                "reason": "there is already a branch with that name to that company"
            };
        } else if (comp_query.length < 1) {
            return {
                "success": false,
                "reason": "the company that this branch would be registerd to doesnt exist"
            };
        } else {
            let result = await this.db_instance.insertToCollection(data, "Branch");
            if (result) {
                return {
                    "success": true
                }
            } else {
                return {
                    "success": false,
                    "reason": "was unable to insert into branch collection "
                }
            }
        }
    }


    // checkes the database to see if the specified email is taken
    async isEmailTaken(query) {
        let data = await this.db_instance.queryCollection(query, "User");

        if (data.length > 0) {
            return true;
        } else {
            return false
        }
    
    }

    // expects data to be what is defined in the User schema -id
    async registerUser(data) {
        var validation = jsonValidator(data,"User");
        if(!validation.valid){
            return{
                "success": false,
                "reason" : validation.errors
            }
        }

        let isTaken = await this.isEmailTaken(data.email);
        
        if (!isTaken & validateUser(data)) {
            data.password = await this.hashPassword(data.password);
            return this.db_instance.insertToCollection(data, "User").then(function(result) {
                return {
                    "success": result
                };
            });
        } else {
            return {
                "success": false,
                "reason": "email is taken or invalid"
            };
        }

    }

    async registerEmployee(data){

        if(data.user == undefined){
            return {"success" : false,
                    "reason" : "user entry is left blank"}
        }

        if(data.employee.company_id == undefined) {
            return {"success" : false,
            "reason" : "you do not belong to a company"}
        }

        if(data.branch == undefined) {
            return {"success" : false,
            "reason" : "branch entry left blank"}
        }

        if(data.employee.position == undefined) {
            return {"success" : false,
            "reason" : "position entry left blank"}
        }

        if(data.employee.pay_rate == undefined) {
            return {"success" : false,
            "reason" : "position entry left blank"}
        }

        let success = await this.registerUser(data.user);
        if (!success.success) {
            return success;
        }

        // Query User Infomration For User ID
        let query = {
            email: data.user.email
        };
        let user = await this.db_instance.queryCollection(query, "User");

        data.employee.user_id = user[0]._id.toString();


        // Query Company Branch For Branch ID
        let query = {
            company_id: data.employee.company_id,
            name : data.employee.branch
        };
        let branch = await this.db_instance.queryCollection(query, "Branch");

        data.employee.branch_id = branch[0]._id.toString();


        var validation = jsonValidator(data.employee,"Employee");
        if(!validation.valid){
            return{
                "success": false,
                "reason" : validation.errors
            }
        }

        let company_query = await this.db_instance.queryCollection(data.employee.company_id, "Company");


        if (company_query.length < 1) {
            return {
                "success": false,
                "reason": "that company doesnt exist"
            };
        }
        else {
            let result = await this.db_instance.insertToCollection(data.employee, "Employee");
            if (result) {
                return {
                    "success": true
                }
            } else {
                return {
                    "success": false,
                    "reason": "was unable to insert into company collection"
                }
            }
        }
    }


    async sendEmail(message){
    
        var validation = jsonValidator(message,"Email");
        console.log(message)
        if(!validation.valid){
            return {
                "success" : false,
                "code" : 400
            };
        }
        
        message["time_sent"] = new Date(Date.now()).toISOString();
                
        let re_format = []; 
        for(var i = 0; i < message.receivers.length; i++){
            let status_dict = { "user_id" : message.receivers[i],
                                "is-read" : false};

            re_format.push(status_dict);
        }
        
        message.receivers = re_format;
        console.log(JSON.stringify(message, null, 4));
        
        let result = await this.db_instance.insertToCollection(message, "Email");
        
        if(!result){
            return {
                "success" : false,
                "code" : 500
            };
        }

        return {
            "success" : true,
        };
    }

    async receiveEmails(query){
        let company_query = await this.db_instance.queryCollection({"user_id" : query.user_id}, "Email");
        console.log(company_query);
        return company_query;
    }

    async getUserSchedule(query){
        let schedule_query = await this.db_instance.queryCollection({"user_id": query.user_id}, "Schedule");
        console.log(schedule_query);
        return schedule_query;
    }

    /*
        expects query = {
            "user_id" : User._id
        }
    */

    async getUsersCompany(query){
        let user_query = await this.db_instance.queryCollection(query, "Employee");
        if(user_query.length < 1){
            return false;
        }

        
        
        return user_query[0].company_id;
    }

    /*
    // expects query = {
        company_id = Company._id
    } 
    */
    async getCompanyUsers(query){
        let employee_query = await this.db_instance.queryCollection(query, "Employee");
        if(employee_query.length < 1){
            return false;
        }

        let user_ids = []
        for(var i = 0; i < employee_query.length; i++){
            user_ids.push( new ObjectID(employee_query[i].user_id));
        }

        let user_query = {
            "_id" : {
                "$in" : user_ids
            }
        }

        let users = await this.db_instance.queryCollection(user_query,"User");
        let redacted_usrs = [];

        for(var i = 0; i < users.length; i++){
            redacted_usrs.push({
                "id" : users[i]._id.toString(), 
                "firstName" : users[i].firstname,
                "lastName" :  users[i].lastname,
            });
        }


        return redacted_usrs;
    }

    /*
        expects query to have 
        query = {
            user_id = User._id
        }
    */

    async getUser(query){
        if(query.user_id == null){
            return 401;
        }
    
        try{
            var user_query = await this.db_instance.queryCollection({"_id": new ObjectID(query.user_id)}, "User");
        }catch(err){
            return 500;
        }
        
        if(user_query < 1){
            return 400;
        }

        return user_query

    }

    /*
        expects 
        data = {
                "user_id" : "Employee._id",
                "password" : "newpassword"
        }
    */
    async resetPassword(data){
        if(data.password == undefined | data.user_id == null){
            return false;
        }

        try{
            var user_query = await this.db_instance.queryCollection({"_id": new ObjectID(data.user_id)}, "User");

        }catch(err){
            return {   
                "success": false,
                "reason": "id provided is invalid format"
            };
        }
        
        if(user_query < 1){
            return {   
                "success": false,
                "reason": "user being updated does not exist"
            };
        }


        let hashed_password = await this.hashPassword(data.password);
        let query = {
            "_id" : new ObjectID(data.user_id),
        }

        let success = this.db_instance.updateDocument(query,{"password" : hashed_password},"User");
        if(success){
            return {
                "success": true
            };
        }
        return {
            "success": success,
            "reason": "was unable to update the document"
        };
    }

    /*
     payload = {
        "firstname" : "firstname",
        "lastname" : "lastname",
        "date_of_birth" : "Date",
        "phone" : "phone numb",
        "address" : address,
        "user_id" : User._id

    }
    

    */
    async updateUser(data){

        try{
            var user_query = await this.db_instance.queryCollection({"_id": new ObjectID(data.user_id)}, "User");

        }catch(err){
            return {   
                "success": false,
                "reason": "id provided is invalid format"
            };
        }
        
        if(user_query < 1){
            return {   
                "success": false,
                "reason": "user being updated does not exist"
            };
        }

        let query = {
            "_id" : new ObjectID(data.user_id),
        }
        delete data["user_id"];
        let success = this.db_instance.updateDocument(query,data,"User");
        if(success){
            return {
                "success": true
            };
        }
        return {
            "success": success,
            "reason": "was unable to update the document"
        };

    }
}

module.exports = CustomerDataBaseOperations;