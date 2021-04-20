import requests
import json
from datetime import date
import ast
new_employee = "http://localhost:3001/api/register/employee"

login = "http://localhost:3001/api/login"
admin_url = "http://localhost:3001/api/register/admin"
send_msg_url = "http://localhost:3001/api/email/send"
new_user = "http://localhost:3001/api/register/user"
password_reset_url = "http://localhost:3001/api/reset/employee/password"
read_email = "http://localhost:3001/api/email/receive"

admin_user = { 
            'firstname': 'Cole',
            "lastname": "Smith",
            "email": "cole@gmails.com",
            "phone": "905-936-1234",
            "address": "37 main street",
            "postal_code": "L0G 1W0",
            "date_of_birth" : "2020-01-01",
            "password": "password"    
}

non_admin =  { 'firstname': 'Cole2',
            "lastname": "Smith2",
            "email": "col222e@gmails.com",
            "phone": "905-936-1234",
            "address": "37 main street",
            "postal_code": "L0G 1W0",
            "date_of_birth" : "2020-01-01",
            "password": "password"
        }
admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA2OTZiM2ZhOTQzM2QzODJlMWI2YzgxIiwiaWF0IjoxNjE3NTI4MDEzfQ.OAiiaI48JoPdItnAwx1HSiNOGWj29tengf5sWUQxGjQ"
non_admin_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjA2OTZiN2ZhOTQzM2QzODJlMWI2Yzg1IiwiaWF0IjoxNjE3NTI4MDM5fQ.1svpxRa4KGQm6_-IafJH7lvx9voCTe2JrNT_09P74Tw"


employee__payload =  {
    "user_id" : "60696b7fa9433d382e1b6c85",
    "Position" : "cook",
    "company_id" : "60696b42a9433d382e1b6c82",
    "pay_rate" : 100.0
} 

new_admin = {  "user" : "60696b7fa9433d382e1b6c85",
    "company" : "60696b42a9433d382e1b6c82",
}

headers = {"Content-Type": "application/json",
            "Authorization" : "Bearer "+non_admin_token
        }

password_reset = {
    "user_id" : "60696b7fa9433d382e1b6c85",
    "password" : "password"
}

message = {
    "receivers" : [
        "60696b7fa9433d382e1b6c85",
        "60696b3fa9433d382e1b6c81",
    ],
    "message" : "nice",
    "title" : "you like jazz"
}



self_usr_url = "http://localhost:3001/api/self/user"
admin_url = "http://localhost:3001/api/admin/user"

user_info = {
        "user_id" : "60696b7fa9433d382e1b6c85",

}

comp_usrs_url = "http://localhost:3001/api/company/users"
response = requests.post(send_msg_url,json=message, headers=headers)
if(response.status_code == 200):
    print(json.dumps(response.json(), indent=4, sort_keys=True))
else:
    print(response)