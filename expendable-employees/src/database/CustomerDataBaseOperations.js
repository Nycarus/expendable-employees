let DatabaseManagment = require('./Interaction.js');
let evalidator = require("email-validator");

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

    async registerCompany(data) {
        let user = {
            email: data.email,
            password: data.password,
            firstname: data.email,
            lastname: data.lastname,
            email: data.email,
            address: data.address,
            postal_code: data.postal_code,
            data_of_birth: data.date_of_birth,
        };

        let success = await this.registerUser(user);
        if (!success.success) {
            return success;
        }

        let query = {
            email: user.email
        };

        user = await this.db_instance.queryCollection(query, "User");

        let company = {
            name: data.company_name,
            owner: user[0]._id
        };

        success = await this.insertCompany(company);
        if (!success.success) {

            await this.db_instance.dropDocument(user, "User");
            // delete created user entry
            return success;
        }


        company = await this.db_instance.queryCollection(company, "Company");

        let branch = {
            name: data.branch_name,
            company_id: company[0]._id
        }
        success = await this.registerBranch(branch);

        if (!success.success) {
            // delete created user and company entry 
            await this.db_instance.dropDocument(user, "User");
            await this.db_instance.dropDocument(company, "Company");
            return success;
        }

        return success;



    }

    // expects data to be what is defined in the company schema - id
    async insertCompany(data) {
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

        return this.db_instance.queryCollection(query, "User").then(function(data) {
            if (data.length > 0) {
                return true;
            } else {
                return false
            }
        });
    }

    // expects data to be what is defined in the User schema -id
    async registerUser(data) {

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