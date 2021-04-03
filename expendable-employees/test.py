import requests
import json
from datetime import date
import ast
url = "http://localhost:3001/api/register/user"

payload = { 'firstname': 'Cole',
            "lastname": "Smith",
            "email": "col2e@gmails.com",
            "phone": "905-936-1234",
            "address": "37 main street",
            "postal_code": "L0G 1W0",
            "date_of_birth" : "2020-01-01",
            "password": "password"
        }



headers = {"Content-Type": "application/json"
        }

response = requests.post(url,json=payload, headers=headers)
if(response.status_code == 200):
    print(json.dumps(response.json(), indent=4, sort_keys=True))
else:
    print(response)