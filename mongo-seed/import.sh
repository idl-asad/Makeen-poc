#! /bin/bash

mongoimport --host db --db makeen --username admin --password Password1 --collection users --authenticationDatabase admin --type json --file /mongo-seed/users.json --jsonArray