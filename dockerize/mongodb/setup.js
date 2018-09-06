// these ops happen in MONGO_INITDB_DATABASE
db.createCollection('user',{})
db.createUser({ user: "root", pwd: "example", roles: [ { role: "root", db: "admin" }]})