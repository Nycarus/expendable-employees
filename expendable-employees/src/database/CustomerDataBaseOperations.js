let DatabaseManagment = require('./Interaction.js');
let evalidator = require("email-validator");
let jsonValidator = require('./SchemaEnforcment');


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

    // expects
    /*
        {
            email : email@email.com
        }
    */
    async getHashedPassword(email){
        let user = await this.db_instance.queryCollection(email, "User");
        if(user.length < 0){
            return {"success": false,
                    "reason": "account not found",
                    "code" : 404}
        }
        return {success : true, "password" : user[0].password}; 
    }

    async registerCompany(data) {
        if(data.user == undefined){
            return {"success" : false,
                    "reason" : "user entry is left blank"}
        }
        if(data.company == undefined) {
            return {"success" : false,
            "reason" : "company entry left blank"}
        }

        if(data.company == undefined) {
            return {"success" : false,
            "reason" : "company entry left blank"}
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

        return success;



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
        let company_query = await this.db_instance.queryCollection(data, "Company");

        // making sure the owner company exists
        let user_query = await this.db_instance.queryCollection(data.owner, "User");


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

        let branch_query = await this.db_instance.queryCollection(data, "Branch");

        // making sure the owner company exists
        let comp_query = await this.db_instance.queryCollection(data.company_id, "Company");


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
        return this.db_instance.queryCollection({"email" : query}, "User").then(function(data) {
            console.log(data.length);
            if (data.length > 0) {
                return true;
            } else {
                return false
            }
        });
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

}


module.exports = CustomerDataBaseOperations;